import React from "react"
import { connectInfiniteHits, connectHits } from "react-instantsearch-dom"
import InfiniteScroll from "react-infinite-scroller"

import { EMPTY_STATES } from "../../constants"
import { ItemCard, ItemCardMini } from "../ItemCard"
import EmptyState from "../EmptyState"
import { Container, MiniContainer, EndCard } from "./StyledComponents"

const AlgoliaInfiniteHits = connectInfiniteHits(({ hits, hasMore, refine }) => {
	return (
		<InfiniteScroll
			element={Container}
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

const AlgoliaHits = connectHits(({ hits }) => (
	<Container>
		{hits.map((hit) => (
			<ItemCard key={hit.objectID} item={hit} />
		))}
	</Container>
))

const AlgoliaMiniHits = connectHits(({ hits }) => (
	<MiniContainer>
		{hits.map((hit) => (
			<ItemCardMini key={hit.objectID} item={hit} />
		))}
	</MiniContainer>
))

export { AlgoliaInfiniteHits, AlgoliaHits, AlgoliaMiniHits }
