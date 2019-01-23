import React from "react"
import { connectInfiniteHits, connectHits } from "react-instantsearch-dom"
import InfiniteScroll from "react-infinite-scroller"
import ContainerDimensions from "react-container-dimensions"

import { EMPTY_STATES } from "../../constants"
import { ItemCard, ItemCardMini } from "../ItemCard"
import EmptyState from "../EmptyState"
import { MiniContainer, EndCard } from "./StyledComponents"
import ItemsView, { ItemsContainer } from "../ItemsView"

const AlgoliaInfiniteHits = connectInfiniteHits(({ hits, hasMore, refine }) => {
	return (
		<InfiniteScroll
			element={ItemsContainer}
			threshold={80}
			hasMore={hasMore}
			loader={<div key={1}>Loading...</div>}
			loadMore={() => {
				refine()
				console.log("loaded more", hits.length)
			}}
		>
			{hits.map((hit) => (
				<ItemCard key={hit.objectID} item={hit} />
			))}
			{!hasMore && (
				<EndCard key={0}>
					<EmptyState state={EMPTY_STATES.NoMoreItems} />
				</EndCard>
			)}
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
