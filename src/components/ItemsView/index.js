import React from "react"
import styled from "styled-components/macro"
import ContainerDimensions from "react-container-dimensions"

import { ItemCard } from "../ItemCard"

export const ItemsContainer = styled.div`
	display: grid;
	grid-gap: 3px;


	${(p) => {
		const cols = Math.min(Math.ceil(p.containerWidth / 325), 3)
		return `grid-template-columns: repeat(${cols}, 1fr);`
	}}

	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		grid-gap: var(--spacing3);
	}
`

export const ItemsList = styled.div`
	display: grid;
	gap: var(--spacing3);
`

const ItemsView = ({ items }) => {
	return (
		<ContainerDimensions>
			{({ width }) => (
				<ItemsContainer containerWidth={width}>
					{items.map((item) => (
						<ItemCard key={item.id} item={item} />
					))}
				</ItemsContainer>
			)}
		</ContainerDimensions>
	)
}

export default ItemsView
