import React from "react"
import styled from "styled-components"
import { connectInfiniteHits } from "react-instantsearch-dom"
import ItemCard from "../ItemCard"
import InfiniteScroll from "react-infinite-scroller"
import { EMPTY_STATES } from "../../constants"
import EmptyState from "../EmptyState"

const Container = styled.div`
	display: grid;
	grid-gap: 10px;

	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		grid-template-columns: 1fr 1fr;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		grid-template-columns: 1fr 1fr 1fr;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[5]}px) {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
`

const EndCard = styled.div`
	background: white;
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	display: flex;
	justify-content: center;
	align-items: center;
	text-transform: uppercase;
	font-size: 0.84rem;
	font-weight: 500;
	padding: 30px 0;
`

const AlgoliaInfiniteHits = ({ hits, hasMore, refine }) => {
	return (
		<>
			<InfiniteScroll
				element={Container}
				useWindow={false}
				threshold={0}
				getScrollParent={() => document.getElementById("base-scroll-container")}
				hasMore={hasMore}
				loader={<div key={1}>Loading...</div>}
				loadMore={() => {
					console.log("loading more", hits.length)
					refine()
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
		</>
	)
}

export default connectInfiniteHits(AlgoliaInfiniteHits)
