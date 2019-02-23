import React from "react"
import ContainerDimensions from "react-container-dimensions"

import { ItemsContainer } from "./StyledComponents"
import DetailedItemCard from "../DetailedItemCard"

const DetailedItemsView = ({ items, userIsOwner }) => {
	return (
		<ContainerDimensions>
			{({ width }) => (
				<ItemsContainer containerWidth={width}>
					{items.map((item) => (
						<DetailedItemCard item={item} key={item.itemId} userIsOwner={userIsOwner} />
					))}
				</ItemsContainer>
			)}
		</ContainerDimensions>
	)
}

export default DetailedItemsView
