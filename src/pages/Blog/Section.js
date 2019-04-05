import React from "react"
import { withRouter, Redirect } from "react-router-dom"

import { MainGrid, ContentArea } from "./StyledComponents"
import { InfinitePosts } from "./PostPreviews"
import Sidebar from "./Sidebar"
import InstantSearchBlogWrapper from "./InstantSearchBlogWrapper"
import { VirtualMenu } from "../../components/Algolia/Virtual"
import { PageContainer } from "../../components/Containers"
import PageNav from "./PageNav"
import { ROUTES } from "../../constants"

const BlogSectionPage = ({ match }) => {
	const selectedSection = decodeURIComponent(match.params.section)

	if (selectedSection === "Wszystko") {
		return <Redirect to={ROUTES.BLOG_HOME} />
	}

	return (
		<PageContainer>
			<InstantSearchBlogWrapper>
				<VirtualMenu attribute="section" defaultRefinement={selectedSection} />
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

export default withRouter(BlogSectionPage)
