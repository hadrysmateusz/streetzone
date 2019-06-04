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

import { Designers, TopContainer } from "./Common"
import withBreakpoints from "react-breakpoints/lib/withBreakpoints"

const { formatPrice, formatSize } = itemDataHelpers

const OuterContainer = styled.div`
	min-width: 0; /* this has to be on the outermost component*/
	min-height: 0;

	> a {
		border: 1px solid var(--gray75);
		overflow: hidden;
		display: grid;

		@media (max-width: ${(p) => p.theme.breakpoints[3] - 1}px) {
			> * {
				min-height: 0;
			}
		}
		@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
			grid-template-columns: 210px 10fr 7fr;
			grid-template-rows: 248px;
		}
	}
`

const OuterDetailsContainer = styled.div`
	display: flex;
	height: 100%;
	align-items: center;
	.mobile-image-container {
		height: 150px;
		width: 126px;

		margin-top: var(--spacing3);
		margin-right: var(--spacing3);
		margin-bottom: var(--spacing3);
	}
`

const DetailsContainer = styled.div`
	display: flex;
	align-content: center;
	margin: var(--spacing2) 0;

	@media (max-width: ${(p) => p.theme.breakpoints[3] - 1}px) {
		flex-direction: column;
	}

	> * + * {
		@media (max-width: ${(p) => p.theme.breakpoints[3] - 1}px) {
			margin-top: var(--spacing2);
		}
		@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
			margin-left: var(--spacing3);
		}
	}
`

const InfoContainer = styled.div`
	display: grid;
	min-height: 0;
	min-width: 0;
	height: 100%;
	padding: var(--spacing2);
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		padding: var(--spacing3);
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

const PromoteStatus = ({ id }) => {
	return (
		<StatusContainer>
			<div>Poziom promowania:</div>
			<div>Pozostało promowania:</div>
		</StatusContainer>
	)
}

const RefreshStatus = ({ id }) => {
	return (
		<StatusContainer>
			<div>Ostatnio odświeżano:</div>
			<div>Pozostało odświeżeń:</div>
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
	const deleteItem = () => alert("deleting")
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
			onClick={() => {
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
	createdAt,
	description,
	category,
	history,
	currentBreakpoint
}) => {
	const { imageURL } = useImage(attachments[mainImageIndex], "M")

	let conditionObj = translateCondition(condition)
	let formattedPrice = formatPrice(price)
	let formattedSize = formatSize(size)

	const isMobile = +currentBreakpoint <= 2

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
					<Button accent fullWidth>
						Promuj
					</Button>
					<PromoteStatus id={id} />
					<Button fullWidth>Odśwież</Button>
					<RefreshStatus id={id} />
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
