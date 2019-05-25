import React from "react"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"
import { withRouter } from "react-router"

import { CONST } from "../../../constants"

import { PageContainer } from "../../../components/Containers"
import { StatelessSearchWrapper } from "../../../components/InstantSearchWrapper"

import Sidebar from "./Sidebar"
import { Layout } from "./Common"
import InfinitePosts from "../InfinitePostsList"

const BlogCategoryPage = ({ currentBreakpoint, match }) => {
	const isMobile = currentBreakpoint <= 1

	const { category } = match.params

	return (
		<>
			<StatelessSearchWrapper
				indexName={CONST.BLOG_POST_ALGOLIA_INDEX}
				refinements={{ category }}
				hitsPerPage={6}
			>
				<PageContainer>
					<Layout>
						{/* Main Content */}
						<main>
							<InfinitePosts />
						</main>
						{/* Sidebar */}
						{!isMobile && <Sidebar />}
					</Layout>
				</PageContainer>
			</StatelessSearchWrapper>
		</>
	)
}

export default compose(
	withBreakpoints,
	withRouter
)(BlogCategoryPage)
