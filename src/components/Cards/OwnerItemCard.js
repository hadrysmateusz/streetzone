import React from "react"
import moment from "moment"
import { withRouter, Link } from "react-router-dom"
import styled, { css } from "styled-components/macro"

import Button, { ButtonContainer, LoaderButton } from "../Button"
import InfoItem from "../InfoItem"
import { SmallTextBlock } from "../StyledComponents"
import { FluidImage } from "../Image"

import { translateCondition } from "../../constants/item_schema"
import { useImage } from "../../hooks"
import { itemDataHelpers, route } from "../../utils"
import { nLinesHigh } from "../../style-utils"

import { Designers, TopContainer, cardBorder } from "./Common"
import withBreakpoints from "react-breakpoints/lib/withBreakpoints"

const { formatPrice, formatSize } = itemDataHelpers

const OuterContainer = styled.div`
	min-width: 0; /* this has to be on the outermost component*/
	min-height: 0;

	> a {
		${cardBorder}
		overflow: hidden;
		display: grid;

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

const PromoteStatus = ({ lastPromotionLevel, promotedUntil }) => {
	// TODO: this only shows full days so it effectively shows one less than it should
	const numDaysLeft = moment(promotedUntil).diff(Date.now(), "days")
	const hasDaysLeft = +numDaysLeft > 0
	// TODO: map promotion levels to their names
	const promotionLevel = hasDaysLeft ? lastPromotionLevel : "Brak"

	return (
		<StatusContainer>
			<div>
				Poziom promowania: <b>{promotionLevel}</b>
			</div>
			<div>
				Pozostało promowania: <b>{numDaysLeft || "Brak"}</b>
			</div>
		</StatusContainer>
	)
}

const RefreshStatus = ({ refreshedAt, createdAt, bumps }) => {
	const remainingBumps = bumps || "Brak"
	const wasRefreshed = refreshedAt && createdAt !== refreshedAt
	// TODO: this only shows full days so it effectively shows one less than it should
	const numDaysAgo = wasRefreshed ? moment().diff(refreshedAt, "days") : "Nigdy"

	return (
		<StatusContainer>
			<div>
				Ostatnio odświeżano: <b>{numDaysAgo}</b>
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

const DeleteButton = ({ id }) => {
	const deleteItem = (e) => {
		e.preventDefault() // prevent the Link to item from triggering
		alert("deleting")
	}
	return (
		<LoaderButton text="Usuń" loadingText="Usuwanie..." onClick={deleteItem} fullWidth />
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

const EditButton = withRouter(({ history, id }) => {
	return (
		<Button
			fullWidth
			onClick={(e) => {
				e.preventDefault() // prevent the Link to item from triggering
				/* This is not an a-tag to allow for programmatic disabling */
				history.push(route("EDIT_ITEM", { id }))
			}}
		>
			Edytuj
		</Button>
	)
})

const OwnerItemCard = ({
	id,
	attachments,
	mainImageIndex,
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
	lastPromotionLevel,
	bumps,
	currentBreakpoint
}) => {
	const { imageURL } = useImage(attachments[mainImageIndex], "M")

	let conditionObj = translateCondition(condition)
	let formattedPrice = formatPrice(price)
	let formattedSize = formatSize(size)

	const isMobile = +currentBreakpoint < 2

	return (
		<OuterContainer>
			<Link to={route("ITEM_DETAILS", { id })}>
				{!isMobile && <FluidImage url={imageURL} />}
				<InfoContainer>
					<TopContainer>
						<div>{category}</div>
						<Designers value={designers} />
					</TopContainer>

					<Name>{name}</Name>

					<OuterDetailsContainer>
						{isMobile && (
							<div className="mobile-image-container">
								<FluidImage url={imageURL} />
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

				<ActionsContainer>
					<Button accent fullWidth as={Link} to={route("ITEM_PROMOTE", { id })}>
						Promuj
					</Button>
					<PromoteStatus
						lastPromotionLevel={lastPromotionLevel}
						promotedUntil={promotedUntil}
					/>
					<Button fullWidth>Odśwież</Button>
					<RefreshStatus
						numBumps={bumps}
						refreshedAt={refreshedAt}
						createdAt={createdAt}
					/>
					<LearnMore />
					<ButtonContainer noMargin>
						<EditButton id={id} />
						<DeleteButton id={id} />
					</ButtonContainer>
				</ActionsContainer>
			</Link>
		</OuterContainer>
	)
}

export default withBreakpoints(OwnerItemCard)
