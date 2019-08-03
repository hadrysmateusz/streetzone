import React, { useState, useContext, memo } from "react"
import moment from "moment"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components/macro"
import { withBreakpoints } from "react-breakpoints"

import Button, { ButtonContainer, LoaderButton } from "../Button"
import InfoItem from "../InfoItem"
import { SmallTextBlock } from "../StyledComponents"
import DeleteItemButton from "../DeleteItemButton"
import { SearchWrapperContext } from "../InstantSearchWrapper"
import FirebaseImage from "../FirebaseImage"

import { translateCondition } from "../../constants/item_schema"
import promotingLevels from "../../constants/promoting_levels"
import { useFlash, useFirebase } from "../../hooks"
import { itemDataHelpers, route, sleep } from "../../utils"
import { nLinesHigh } from "../../style-utils"

import { Designers, TopContainer, cardBorder } from "./Common"

const { formatPrice, formatSize } = itemDataHelpers

const OuterContainer = styled.div`
	min-width: 0;
	max-width: 100%;
	width: 100%;
	min-height: 0;
	background: white;

	${cardBorder}
	overflow: hidden;
	display: grid;

	@media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
		&,
		:hover {
			border-left: none;
			border-right: none;
			margin-right: -4px;
			margin-left: -4px;
		}
	}
	@media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
		> * {
			min-height: 0;
		}
	}
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: 210px 10fr 10fr;
		grid-template-rows: 248px;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		grid-template-columns: 210px 10fr 7fr;
	}
`

const OuterDetailsContainer = styled.div`
	display: flex;
	height: 100%;
	align-items: center;
	.mobile-image-container {
		height: 200px;
		width: 156px;

		margin-top: var(--spacing3);
		margin-right: var(--spacing3);
		margin-bottom: var(--spacing3);
	}
`

const DetailsContainer = styled.div`
	display: flex;
	align-content: center;
	margin: var(--spacing2) 0;

	@media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
		flex-direction: column;
	}

	> * + * {
		@media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
			margin-top: var(--spacing2);
		}
		@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
			margin-left: var(--spacing4);
		}
	}
`

const InfoContainer = styled.div`
	display: grid;
	grid-template-rows: repeat(4, min-content) minmax(0, 1fr);
	grid-template-columns: 100%;
	min-height: 0;
	min-width: 0;
	height: 100%;
	padding: var(--spacing2);
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		padding: var(--spacing3);
	}
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		padding-right: 0;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		padding-right: var(--spacing3);
	}
`

const Name = styled.div`
	color: var(--black0);
	font-size: var(--font-size--l);
	font-family: var(--font-family--serif);
	font-weight: bold;
	height: 100%;
	${nLinesHigh(2, { useMaxHeight: true, lineHeight: 1.5 })}
`

const ActionsContainer = styled.div`
	padding: var(--spacing2);
	display: flex;
	flex-direction: column;
	align-items: center;

	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		padding: var(--spacing3);
	}
`

const StatusContainer = styled.div`
	font-size: var(--fs-xs);
	color: var(--black25);
	padding: var(--spacing2) 0;
	display: flex;
	align-content: center;
	justify-content: center;

	> * + * {
		margin-left: var(--spacing3);
	}
`

const PromoteStatus = ({ promotingLevel, promotedUntil }) => {
	const numDaysLeft = moment(promotedUntil).diff(Date.now(), "days")
	const diff = moment(promotedUntil).diff(moment())
	const timeLeft = promotedUntil ? moment.duration(diff).humanize() : "Brak"
	const hasTimeLeft = numDaysLeft > 0
	const promotingType = hasTimeLeft ? promotingLevels[promotingLevel] : "Brak"

	return (
		<StatusContainer>
			<div>
				Poziom promowania: <b>{promotingType}</b>
			</div>
			<div>
				Pozostało promowania: <b>{timeLeft}</b>
			</div>
		</StatusContainer>
	)
}

const RefreshStatus = ({ refreshedAt, createdAt, bumps }) => {
	const remainingBumps = bumps || "Brak"
	const wasRefreshed = refreshedAt && createdAt !== refreshedAt
	const lastRefreshed = wasRefreshed ? moment().to(refreshedAt) : "Nigdy"

	return (
		<StatusContainer>
			<div>
				Ostatnio odświeżano: <b>{lastRefreshed}</b>
			</div>
			<div>
				Pozostało odświeżeń: <b>{remainingBumps}</b>
			</div>
		</StatusContainer>
	)
}

const DescriptionContainer = styled.div`
	min-height: 0;
	overflow: auto;
`

const Description = ({ children }) => {
	return (
		<>
			<SmallTextBlock>Opis</SmallTextBlock>
			<DescriptionContainer>{children}</DescriptionContainer>
		</>
	)
}

const LearnMore = () => {
	return (
		<Link
			to={route("PROMOTING_INFO")}
			css={css`
				font-size: var(--fs-xs);
				text-decoration: underline;
				color: var(--gray0);
				text-align: center;
				width: 100%;
				display: block;
				padding-bottom: var(--spacing3); /* necessary on mobile */
			`}
		>
			Poznaj korzyści promowania i odświeżania
		</Link>
	)
}

const EditButton = ({ id }) => {
	return (
		<Button fullWidth as={Link} to={route("EDIT_ITEM", { id })}>
			Edytuj
		</Button>
	)
}

const RefreshButton = ({ id, bumpsLeft }) => {
	const flashMessage = useFlash()
	const [isRefreshing, setIsRefreshing] = useState(false)
	const firebase = useFirebase()
	const searchContext = useContext(SearchWrapperContext)
	const { refresh } = searchContext

	const hasBumps = bumpsLeft && +bumpsLeft > 0

	const refreshItem = async () => {
		// If already is refreshing, exit
		if (isRefreshing) return

		// Exit if no bumps left
		// TODO: show modal or sth to encourage buying more
		if (!hasBumps) return

		setIsRefreshing(true)
		try {
			await firebase.item(id).update({ refreshedAt: Date.now(), bumps: bumpsLeft - 1 })
		} catch (err) {
			throw err
		} finally {
			refresh()
			setIsRefreshing(false)
		}
	}

	const onClick = async () => {
		try {
			await refreshItem()

			// show flash message
			flashMessage({
				type: "success",
				textContent: "Odświeżono",
				details: "Odśwież stronę za kilka sekund by zobaczyć zmiany"
			})
		} catch (err) {
			// TODO: error handling
			flashMessage({ type: "error", textContent: "Wystąpił błąd" })
		}
	}

	return (
		<LoaderButton
			fullWidth
			text="Odśwież"
			loadingText="Odświeżanie..."
			onClick={onClick}
			disabled={!hasBumps}
			isLoading={isRefreshing}
		/>
	)
}

const PromoteButton = ({ id }) => {
	return (
		<Button accent fullWidth as={Link} to={route("ITEM_PROMOTE", { id })}>
			Promuj
		</Button>
	)
}

const OwnerItemCardDumb = memo(
	({
		id,
		condition,
		designers,
		price,
		size,
		name,
		description,
		category,
		createdAt,
		refreshedAt,
		promotedUntil,
		promotingLevel,
		bumps,
		isMobile,
		mainImageIndex,
		attachments
	}) => {
		let conditionObj = translateCondition(condition)
		let formattedPrice = formatPrice(price)
		let formattedSize = formatSize(size)

		return (
			<OuterContainer>
				{!isMobile && <FirebaseImage storageRef={attachments[mainImageIndex]} size="M" />}
				<Link
					to={route("ITEM_DETAILS", { id })}
					css={css`
						min-width: 0;
						min-height: 0;
					`}
				>
					<InfoContainer>
						<TopContainer>
							<div>{category}</div>
							<Designers value={designers} />
						</TopContainer>

						<Name>{name}</Name>

						<OuterDetailsContainer>
							{isMobile && (
								<div className="mobile-image-container">
									<FirebaseImage storageRef={attachments[mainImageIndex]} size="M" />
								</div>
							)}

							<DetailsContainer>
								<InfoItem name="Cena">{formattedPrice}</InfoItem>
								<InfoItem name="Stan">{conditionObj.displayValue}</InfoItem>
								<InfoItem name="Rozmiar">{formattedSize}</InfoItem>
							</DetailsContainer>
						</OuterDetailsContainer>

						<Description>{description}</Description>
					</InfoContainer>
				</Link>

				<ActionsContainer>
					<PromoteButton id={id} />
					<PromoteStatus promotingLevel={promotingLevel} promotedUntil={promotedUntil} />
					<RefreshButton id={id} bumpsLeft={bumps} />
					<RefreshStatus bumps={bumps} refreshedAt={refreshedAt} createdAt={createdAt} />
					<LearnMore />
					<ButtonContainer noMargin>
						<EditButton id={id} />
						<DeleteItemButton id={id} />
					</ButtonContainer>
				</ActionsContainer>
			</OuterContainer>
		)
	}
)

const OwnerItemCard = withBreakpoints(({ currentBreakpoint, ...rest }) => {
	const isMobile = +currentBreakpoint < 2
	return <OwnerItemCardDumb isMobile={isMobile} {...rest} />
})

export default OwnerItemCard
