import React from "react"
import ContainerDimensions from "react-container-dimensions"

import DetailedItemCard from "../DetailedItemCard"

import { ItemsContainer } from "./StyledComponents"

const DetailedItemsView = ({ items, isUserOwner }) => {
	return (
		<ContainerDimensions>
			{({ width }) => (
				<ItemsContainer containerWidth={width}>
					{items.map((item) => (
						<DetailedItemCard item={item} key={item.itemId} isUserOwner={isUserOwner} />
					))}
				</ItemsContainer>
			)}
		</ContainerDimensions>
	)
}

export default DetailedItemsView
