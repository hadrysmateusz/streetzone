import React from "react"
import { connectInfiniteHits, connectHits } from "react-instantsearch-dom"
import InfiniteScroll from "react-infinite-scroller"
import ContainerDimensions from "react-container-dimensions"

import LoadingSpinner from "../LoadingSpinner"
import { ItemCard, ItemCardMini } from "../ItemCard"
import { ItemsContainer } from "../ItemsView"
import Button from "../Button"

import { MiniContainer, ItemsLoaderContainer } from "./StyledComponents"
import useDelayRender from "../../hooks/useDelayRender"

const ItemsLoader = ({ refine }) => {
	const shouldRender = useDelayRender(200)

	return shouldRender ? (
		<ItemsLoaderContainer>
			<LoadingSpinner fixedHeight />
			<Button onClick={refine}>Wczytaj więcej</Button>
		</ItemsLoaderContainer>
	) : null
}

const AlgoliaInfiniteHits = connectInfiniteHits(({ hits, hasMore, refine }) => {
	return (
		<InfiniteScroll
			hasMore={hasMore}
			loader={<ItemsLoader refine={refine} key="loader-component" />}
			initialLoad={false}
			loadMore={refine}
		>
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
		</InfiniteScroll>
	)
})

const AlgoliaMiniHits = connectHits(({ hits }) => (
	<ContainerDimensions>
		{({ width }) => (
			<MiniContainer containerWidth={width}>
				{hits.map((hit) => (
					<ItemCardMini key={hit.objectID} item={hit} />
				))}
			</MiniContainer>
		)}
	</ContainerDimensions>
))

export { AlgoliaInfiniteHits, AlgoliaMiniHits, ItemsLoader }
