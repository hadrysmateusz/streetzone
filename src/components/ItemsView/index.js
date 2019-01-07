import React from "react"
import styled from "styled-components"

import ItemCard from "../ItemCard"
import withLoader from "../withLoader"

const ItemsGrid = styled.div`
	display: grid;
	grid-gap: 14px;

	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		grid-template-columns: 1fr 1fr;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: 1fr 1fr;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		grid-template-columns: 1fr 1fr 1fr;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[5]}px) {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
`

const ItemsViewBase = ({ items }) => {
	console.log(items)
	return (
		<ItemsGrid>
			{items.map((item, i) => (
				<ItemCard key={i} item={item} />
			))}
		</ItemsGrid>
	)
}

const ItemsView = withLoader(ItemsViewBase)

const AlgoliaItemsView = ({ hits, ...props }) => {
	console.log(hits, props)
	return <ItemsView items={hits} {...props} />
}

export default ItemsView

export { AlgoliaItemsView }
