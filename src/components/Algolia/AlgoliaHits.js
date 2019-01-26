import React from "react"
import { connectInfiniteHits, connectHits } from "react-instantsearch-dom"
import InfiniteScroll from "react-infinite-scroller"
import ContainerDimensions from "react-container-dimensions"

import LoadingSpinner from "../LoadingSpinner"
import { ItemCard, ItemCardMini } from "../ItemCard"
import { MiniContainer } from "./StyledComponents"
import ItemsView, { ItemsContainer } from "../ItemsView"

const AlgoliaInfiniteHits = connectInfiniteHits(({ hits, hasMore, refine }) => {
	return (
		<InfiniteScroll
			hasMore={hasMore}
			loader={
				<div key={1}>
					<LoadingSpinner />
					<button onClick={refine}>Wczytaj więcej</button>
				</div>
			}
			initialLoad={false}
			loadMore={() => {
				refine()
				console.log("loaded more", hits.length)
			}}
		>
			<ContainerDimensions>
				{({ width }) =>
					width && (
						<ItemsContainer containerWidth={width}>
							{hits.map((item) => (
								<ItemCard key={item.objectID} item={item} />
							))}
						</ItemsContainer>
					)
				}
			</ContainerDimensions>
		</InfiniteScroll>
	)
})

const AlgoliaHits = connectHits(({ hits }) => <ItemsView items={hits} />)

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

export { AlgoliaInfiniteHits, AlgoliaHits, AlgoliaMiniHits }
