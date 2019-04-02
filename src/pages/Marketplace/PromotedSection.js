import React from "react"
import styled from "styled-components"
import { connectHits } from "react-instantsearch-dom"
import moment from "moment"
import { Link } from "react-router-dom"

import { UncontrolledInstantSearchWrapper } from "../../components/InstantSearchWrapper"
import { PageContainer } from "../../components/Containers"
import { VirtualRange } from "../../components/Algolia/Virtual"
import { CONST } from "../../constants"
import { TextBlock } from "../../components/StyledComponents"
import { ItemCard, useImage } from "../../components/ItemCard"
import formatDesigners from "../../utils/formatDesigners"
import formatPrice from "../../utils/formatPrice"
import formatSize from "../../utils/formatSize"
import Button, { ButtonContainer } from "../../components/Button"

const OuterContainer = styled.div`
	/* background: linear-gradient(1225deg, #fbfbfb, #e5e5e5); */
	/* background: var(--almost-white); */
	padding: var(--spacing3) 0;
`

const InnerContainerContainer = styled.div``

const TopContainer = styled.div`
	margin-top: var(--spacing3);
	display: grid;
	gap: var(--spacing2);

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: 2fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: var(--spacing3);
		height: 440px;
		> *:first-child {
			grid-row: span 2;
		}
	}
`

const PromotedItemContainer = styled.div`
	width: 100%;
	height: 100%;
  /* background-image: url(${(p) => p.image});
  background-color: var(--almost-white); */
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.24)),
		url(${(p) => p.image});
	background-size: cover;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	color: white;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	padding: var(--spacing3) 0;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		padding: var(--spacing4) 0;
	}
`

const BottomContainer = styled.div`
	margin-top: var(--spacing3);
	display: grid;
	gap: var(--spacing2);
	grid-auto-columns: 120px;
	overflow: auto;
	width: auto;
	grid-auto-flow: column;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-auto-flow: column;
		grid-template-columns: repeat(auto-fill, 160px);
		gap: var(--spacing3);
	}
`

const InnerContainer = connectHits(({ hits }) => {
	const main = hits.slice(0, 3)
	const other = hits.slice(3)
	return (
		<InnerContainerContainer>
			<TextBlock bold uppercase>
				<span role="img" aria-label="asdf">
					🔥 Promowane
				</span>
			</TextBlock>
			<TopContainer>
				{main.map((hit) => (
					<PromotedItem item={hit} />
				))}
			</TopContainer>
			<BottomContainer>
				{other.map((hit) => (
					<ItemCard item={hit} />
				))}
			</BottomContainer>
		</InnerContainerContainer>
	)
})

const PromotedItem = ({ item }) => {
	const [imageURL, error] = useImage(item.attachments[0], "L")

	const formattedDesigners = formatDesigners(item.designers)
	const formattedPrice = formatPrice(item.price)
	const formattedSize = formatSize(item.size)

	return (
		<Link to={`/i/${item.itemId}`}>
			<PromotedItemContainer image={imageURL}>
				<TextBlock serif size="xl">
					{item.name}
				</TextBlock>
				<TextBlock serif>{formattedDesigners}</TextBlock>
				{/* <TextBlock serif>
					Cena: <b>{formattedPrice}</b>&nbsp;&nbsp;&nbsp; Rozmiar: <b>{formattedSize}</b>
				</TextBlock> */}
				<ButtonContainer centered>
					{/* <Button>Więcej informacji</Button> */}
					<Button>Kup za {formattedPrice}</Button>
				</ButtonContainer>
			</PromotedItemContainer>
		</Link>
	)
}

const PromotedSection = () => {
	const minDate = moment(Date.now())
		.subtract(7, "days")
		.valueOf()

	return (
		<OuterContainer>
			<UncontrolledInstantSearchWrapper
				indexName={CONST.DEV_ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
			>
				<VirtualRange attribute="promotedAt" defaultRefinement={{ min: minDate }} />
				<PageContainer noMargin>
					<InnerContainer />
				</PageContainer>
			</UncontrolledInstantSearchWrapper>
		</OuterContainer>
	)
}

export default PromotedSection
