import React from "react"
import styled from "styled-components/macro"

import InfiniteScrollingResults from "../../components/InfiniteScrollingResults"
import PostPreview from "../../components/PostPreview"

const PostsContainer = styled.div`
	display: grid;
	grid-template-columns: 100%;

	gap: var(--spacing3);
	@media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
		margin: 0 calc(var(--spacing3) * -1);
	}
`

const InfinitePosts = () => {
	return (
		<InfiniteScrollingResults>
			{({ results }) => (
				<PostsContainer>
					{results.map((post) => (
						<PostPreview {...post} key={post.id} />
					))}
				</PostsContainer>
			)}
		</InfiniteScrollingResults>
	)
}

export default InfinitePosts
