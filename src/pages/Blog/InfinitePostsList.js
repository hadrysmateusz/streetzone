import React from "react"
import { connectInfiniteHits } from "react-instantsearch-core"
import InfiniteScroll from "react-infinite-scroller"

import LoadingSpinner from "../../components/LoadingSpinner"

import { PostsContainer } from "./StyledComponents"
import { BasicPost } from "./Previews"

const InfinitePosts = connectInfiniteHits(({ hits, hasMore, refine, ...rest }) => {
	return (
		<InfiniteScroll
			hasMore={hasMore}
			loader={<LoadingSpinner fixedHeight />}
			initialLoad={false}
			loadMore={refine}
			{...rest}
		>
			<PostsContainer>
				{hits.map((post) => (
					<BasicPost {...post} />
				))}
			</PostsContainer>
		</InfiniteScroll>
	)
})

export default InfinitePosts
