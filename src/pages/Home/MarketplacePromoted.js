import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"

import { LinkButton, ButtonContainer } from "../../components/Button"
import { FluidImage } from "../../components/Image"
import { StatelessSearchWrapper } from "../../components/InstantSearchWrapper"
import PageHeading from "../../components/PageHeading"

import { CONST } from "../../constants"
import { useImage } from "../../hooks"
import { itemDataHelpers, route } from "../../utils"
import { ellipsis, nLinesHigh } from "../../style-utils"

const { formatDesigners } = itemDataHelpers

const OuterContainer = styled.div`
	margin-top: var(--spacing6);
`

const InnerContainer = styled.div`
	display: grid;
	gap: var(--spacing3);
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing4);
	}
`
const PromotedItemContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr minmax(180px, 0.5fr);
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		grid-template-columns: 1fr minmax(180px, 0.8fr);
	}
	gap: var(--spacing3);
`
const InfoContainer = styled.div`
	padding: var(--spacing3) 0;
`
const Designers = styled.div`
	font-size: var(--font-size--s);
	color: var(--gray0);
	text-transform: uppercase;
	margin-bottom: var(--spacing3);

	${ellipsis}
`
const Name = styled.div`
	font-size: var(--font-size--l);
	font-weight: var(--semi-bold);
	${nLinesHigh(2, { lineHeight: 1.3 })}
	margin-bottom: var(--spacing3);
	text-overflow: ellipsis;
`

const PromotedItem = ({ attachments, mainImageIndex, name, designers, price, id }) => {
	const { imageURL } = useImage(attachments[mainImageIndex], "M")
	const formattedDesigners = formatDesigners(designers)

	const itemLink = route("ITEM_DETAILS", { id })

	return (
		<PromotedItemContainer>
			<InfoContainer>
				<Designers>{formattedDesigners}</Designers>
				<Link to={itemLink}>
					<Name title={name}>{name}</Name>
				</Link>
				<ButtonContainer noMargin>
					<LinkButton wide primary to={itemLink}>
						Kup za {price}zł
					</LinkButton>
				</ButtonContainer>
			</InfoContainer>
			<Link to={itemLink}>
				<FluidImage url={imageURL} />
			</Link>
		</PromotedItemContainer>
	)
}

const MarketplacePromoted = () => {
	return (
		<OuterContainer>
			<PageHeading emoji={"🔥"}>Promowane na tablicy</PageHeading>
			<StatelessSearchWrapper
				indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
				refinements={{ promotedUntil: { min: Date.now() } }}
			>
				{(hits) => (
					<InnerContainer>
						{hits.map((result) => (
							<PromotedItem {...result} />
						))}
					</InnerContainer>
				)}
			</StatelessSearchWrapper>
		</OuterContainer>
	)
}

export default MarketplacePromoted
