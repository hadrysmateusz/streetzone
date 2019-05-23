import React from "react"
import { connectInfiniteHits } from "react-instantsearch-core"
import InfiniteScroll from "react-infinite-scroller"
import styled from "styled-components/macro"

import LoadingSpinner from "../../components/LoadingSpinner"
import PostPreview from "../../components/PostPreview"

const PostsContainer = styled.div`
	display: grid;
	grid-template-columns: 100%;

	gap: 10px;
	@media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
		margin: 0 calc(var(--spacing3) * -1);
	}
`

const InfinitePosts = connectInfiniteHits(({ hits, hasMore, refine, ...rest }) => {
	return (
		<InfiniteScroll
			hasMore={hasMore}
			loader={<LoadingSpinner />}
			initialLoad={false}
			loadMore={refine}
			{...rest}
		>
			<PostsContainer>
				{hits.map((post) => (
					<PostPreview {...post} />
				))}
			</PostsContainer>
		</InfiniteScroll>
	)
})

export default InfinitePosts
