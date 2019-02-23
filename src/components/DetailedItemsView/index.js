import React from "react"
import ContainerDimensions from "react-container-dimensions"

import { ItemsContainer } from "./StyledComponents"
import DetailedItemCard from "../DetailedItemCard"

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
