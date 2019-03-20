import React from "react"
import ContainerDimensions from "react-container-dimensions"

import DetailedItemCard from "../DetailedItemCard"

import { ItemsContainer } from "./StyledComponents"

const DetailedItemsView = ({ items, isAuthorized }) => {
	return (
		<ContainerDimensions>
			{({ width }) => (
				<ItemsContainer containerWidth={width}>
					{items.map((item) => (
						<DetailedItemCard item={item} key={item.itemId} isAuthorized={isAuthorized} />
					))}
				</ItemsContainer>
			)}
		</ContainerDimensions>
	)
}

export default DetailedItemsView
