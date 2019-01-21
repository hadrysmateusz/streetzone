import React from "react"
import styled from "styled-components"
import { connectInfiniteHits, connectHits } from "react-instantsearch-dom"
import ItemCard, { ItemCardMini } from "../ItemCard"
import InfiniteScroll from "react-infinite-scroller"
import { EMPTY_STATES } from "../../constants"
import EmptyState from "../EmptyState"
// import { AlgoliaItemCard } from "../ItemCard"

const Container = styled.div`
	display: grid;
	grid-gap: 10px;
	grid-auto-rows: minmax(345px, auto);

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

const MiniContainer = styled.div`
	display: grid;
	overflow: auto;
	/* width: calc(100vw * 1.5); */
	grid-auto-rows: minmax(240px, auto);
	grid-template-columns: repeat(6, 45%);
	grid-gap: 4px;

	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		grid-gap: 10px;
		grid-template-columns: repeat(6, 30%);
	}
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: repeat(6, 23%);
	}
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		grid-template-columns: repeat(6, 22%);
	}
	@media (min-width: ${(p) => p.theme.breakpoints[4]}px) {
		grid-template-columns: 1fr 1fr 1fr;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[5]}px) {
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
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
	box-shadow: 0 3px 6px -2px rgba(0, 0, 0, 0.12);
`

const AlgoliaInfiniteHits = ({ hits, hasMore, refine }) => {
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
}

export const AlgoliaHits = connectHits(({ hits }) => (
	<Container>
		{hits.map((hit) => (
			<ItemCard key={hit.objectID} item={hit} />
		))}
	</Container>
))

export const AlgoliaMiniHits = connectHits(({ hits }) => (
	<MiniContainer>
		{hits.map((hit) => (
			<ItemCardMini key={hit.objectID} item={hit} />
		))}
	</MiniContainer>
))

export default connectInfiniteHits(AlgoliaInfiniteHits)
