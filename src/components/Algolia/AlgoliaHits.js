import React from "react"
import { connectInfiniteHits, connectHits } from "react-instantsearch-dom"
import InfiniteScroll from "react-infinite-scroller"
import ContainerDimensions from "react-container-dimensions"

import LoadingSpinner from "../LoadingSpinner"
import { ItemCard, ItemCardHorizontal } from "../ItemCard"
import { ItemsContainer, ItemsList } from "../ItemsView"
import Button from "../Button"
import { ScrollableContainer } from "../Basics"

import { ItemsLoaderContainer, InfiniteOwnerCardsContainer } from "./StyledComponents"
import useDelayRender from "../../hooks/useDelayRender"
import OwnerItemCard from "../OwnerItemCard"

export const ItemsLoader = ({ refine }) => {
	const shouldRender = useDelayRender(200)

	return shouldRender ? (
		<ItemsLoaderContainer>
			<LoadingSpinner fixedHeight />
			<Button onClick={refine}>Wczytaj więcej</Button>
		</ItemsLoaderContainer>
	) : null
}

export const AlgoliaInfiniteHits = connectInfiniteHits(
	({ hits, hasMore, refine, viewMode = "grid" }) => {
		return (
			<InfiniteScroll
				hasMore={hasMore}
				loader={<ItemsLoader refine={refine} key="loader-component" />}
				initialLoad={false}
				loadMore={refine}
			>
				{viewMode === "list" ? (
					<ItemsList>
						{hits.map((item) => (
							<ItemCardHorizontal key={item.objectID} item={item} />
						))}
					</ItemsList>
				) : viewMode === "grid" ? (
					<ContainerDimensions>
						{({ width }) =>
							width ? (
								<ItemsContainer containerWidth={width}>
									{hits.map((item) => (
										<ItemCard key={item.objectID} item={item} />
									))}
								</ItemsContainer>
							) : null
						}
					</ContainerDimensions>
				) : null}
			</InfiniteScroll>
		)
	}
)

export const AlgoliaScrollableHits = connectHits(({ hits }) => (
	<ContainerDimensions>
		{({ width }) => (
			<ScrollableContainer containerWidth={width}>
				{hits.map((item) => (
					<ItemCard key={item.objectID} item={item} />
				))}
			</ScrollableContainer>
		)}
	</ContainerDimensions>
))

export const InfiniteOwnerCards = connectInfiniteHits(({ hits, hasMore, refine }) => {
	return (
		<InfiniteScroll
			hasMore={hasMore}
			loader={<ItemsLoader refine={refine} key="loader-component" />}
			initialLoad={false}
			loadMore={refine}
		>
			<InfiniteOwnerCardsContainer>
				{hits.map((item) => (
					<OwnerItemCard key={item.objectID} item={item} />
				))}
			</InfiniteOwnerCardsContainer>
		</InfiniteScroll>
	)
})
