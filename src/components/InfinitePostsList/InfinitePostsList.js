import InfiniteScrollingResults from "../InfiniteScrollingResults"
import PostPreview from "../PostPreview"

import { PostsContainer } from "./InfinitePostsList.styles"

export const InfinitePosts = () => (
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

export default InfinitePosts
