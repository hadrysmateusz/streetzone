import React from "react"
import { withRouter } from "react-router-dom"

import { MainGrid, ContentArea } from "../StyledComponents"
import InfinitePosts from "../InfinitePostsList"
import Sidebar from "./Sidebar"
import InstantSearchBlogWrapper from "../InstantSearchBlogWrapper"
import { VirtualMenu } from "../../../components/Algolia/Virtual"
import { PageContainer } from "../../../components/Containers"
import PageNav from "../PageNav"

const BlogTagPage = ({ match }) => {
	const selectedTag = decodeURIComponent(match.params.tag)
	const currentSection = decodeURIComponent(match.params.section)
	const shouldFilterSection = currentSection && currentSection !== "Wszystko"

	return (
		<PageContainer>
			<InstantSearchBlogWrapper>
				{shouldFilterSection && (
					<VirtualMenu attribute="section" defaultRefinement={currentSection} />
				)}
				<VirtualMenu attribute="tags" defaultRefinement={selectedTag} />
				<PageNav />
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
