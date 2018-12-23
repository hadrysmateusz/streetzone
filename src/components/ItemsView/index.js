import React from "react"
import styled from "styled-components"

import ItemCard from "../ItemCard"
import withLoader from "../withLoader"
import { BREAKPOINTS } from "../../constants/const"

const ItemsGrid = styled.div`
	display: grid;
	grid-gap: 14px;

	@media (min-width: ${BREAKPOINTS[0]}px) {
		grid-template-columns: 1fr 1fr;
	}
	@media (min-width: ${BREAKPOINTS[1]}px) {
		grid-template-columns: 1fr 1fr;
	}
	@media (min-width: ${BREAKPOINTS[2]}px) {
		grid-template-columns: 1fr 1fr 1fr;
	}
	@media (min-width: ${BREAKPOINTS[3]}px) {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
`

const ItemsView = ({ items }) => {
	return (
		<ItemsGrid>
			{items.map((item, i) => (
				<ItemCard key={i} item={item} />
			))}
		</ItemsGrid>
	)
}

export default withLoader(ItemsView)
