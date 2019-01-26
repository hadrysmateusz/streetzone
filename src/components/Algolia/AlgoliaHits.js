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
			hasMore={hasMore}
			loader={
				<div key={1} onClick={refine}>
					Loading...
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

// import React from "react"
// import { connectInfiniteHits, connectHits } from "react-instantsearch-dom"
// import InfiniteScroll from "react-infinite-scroll-component"
// import ContainerDimensions from "react-container-dimensions"

// import { EMPTY_STATES } from "../../constants"
// import { ItemCard, ItemCardMini } from "../ItemCard"
// import EmptyState from "../EmptyState"
// import { MiniContainer, EndCard } from "./StyledComponents"
// import ItemsView, { ItemsContainer } from "../ItemsView"

// const AlgoliaInfiniteHits = connectInfiniteHits(({ hits, hasMore, refine }) => {
// 	return (
// 		<InfiniteScroll
// 			dataLength={hits.length} //This is important field to render the next data
// 			scrollThreshold={"250px"}
// 			next={refine}
// 			hasMore={hasMore}
// 			loader={<h4>Loading...</h4>}
// 			endMessage={
// 				<p style={{ textAlign: "center" }}>
// 					<b>Yay! You have seen it all</b>
// 				</p>
// 			}
// 		>
// 			<ContainerDimensions>
// 				{({ width }) => (
// 					<ItemsContainer containerWidth={width}>
// 						{hits.map((item) => (
// 							<ItemCard key={item.objectID} item={item} />
// 						))}
// 					</ItemsContainer>
// 				)}
// 			</ContainerDimensions>
// 		</InfiniteScroll>
// 	)
// })

// const AlgoliaHits = connectHits(({ hits }) => <ItemsView items={hits} />)

// const AlgoliaMiniHits = connectHits(({ hits }) => (
// 	<ContainerDimensions>
// 		{({ width }) => (
// 			<MiniContainer containerWidth={width}>
// 				{hits.map((hit) => (
// 					<ItemCardMini key={hit.objectID} item={hit} />
// 				))}
// 			</MiniContainer>
// 		)}
// 	</ContainerDimensions>
// ))

// export { AlgoliaInfiniteHits, AlgoliaHits, AlgoliaMiniHits }
