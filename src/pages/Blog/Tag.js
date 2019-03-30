import React from "react"
import { withRouter } from "react-router-dom"

import { MainGrid, ContentArea } from "./StyledComponents"
import { InfinitePosts } from "./PostPreviews"
import Sidebar from "./Sidebar"
import InstantSearchBlogWrapper from "./InstantSearchBlogWrapper"
import { VirtualMenu } from "../../components/Algolia/Virtual"
import { PageContainer } from "../../components/Containers"

const BlogTagPage = ({ match }) => {
	const selectedTag = decodeURIComponent(match.params.tag)

	return (
		<PageContainer>
			<InstantSearchBlogWrapper>
				<VirtualMenu attribute="tags" defaultRefinement={selectedTag} />

				<MainGrid>
					<Sidebar />
					<ContentArea>
						<InfinitePosts />
					</ContentArea>
				</MainGrid>
			</InstantSearchBlogWrapper>
		</PageContainer>
	)
}

export default withRouter(BlogTagPage)
