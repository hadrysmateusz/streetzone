import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"

import { LinkButton, ButtonContainer } from "../../components/Button"
import { StatelessSearchWrapper } from "../../components/InstantSearchWrapper"
import PageHeading from "../../components/PageHeading"

import { CONST } from "../../constants"
import { itemDataHelpers, route } from "../../utils"
import { ellipsis, nLinesHigh } from "../../style-utils"
import FirebaseImage from "../../components/FirebaseImage"

const { formatDesigners } = itemDataHelpers

const OuterContainer = styled.div`
	margin-top: var(--spacing5);
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		margin-top: var(--spacing6);
	}
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
	grid-template-columns: 1fr minmax(140px, 0.5fr);
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		grid-template-columns: 1fr minmax(140px, 0.8fr);
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
					<LinkButton primary to={itemLink}>
						Kup za {price}zł
					</LinkButton>
				</ButtonContainer>
			</InfoContainer>
			<Link to={itemLink}>
				<FirebaseImage storageRef={attachments[mainImageIndex]} />
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
				refinements={{ promotedUntil: { min: Date.now() }, promotingLevel: 2 }}
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
