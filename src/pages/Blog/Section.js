import React from "react"
import { withRouter } from "react-router-dom"

import { MainGrid, ContentArea } from "./StyledComponents"
import { InfinitePosts } from "./PostPreviews"
import Sidebar from "./Sidebar"
import InstantSearchBlogWrapper from "./InstantSearchBlogWrapper"
import { VirtualMenu } from "../../components/Algolia/Virtual"
import { PageContainer } from "../../components/Containers"

const BlogSectionPage = ({ match }) => {
	const selectedSection = decodeURIComponent(match.params.section)

	return (
		<PageContainer>
			<InstantSearchBlogWrapper>
				<VirtualMenu attribute="section" defaultRefinement={selectedSection} />

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

export default withRouter(BlogSectionPage)
