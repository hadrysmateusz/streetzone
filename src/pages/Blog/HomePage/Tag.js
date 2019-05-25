import React from "react"
import styled from "styled-components/macro"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"
import { withRouter } from "react-router"

import { CONST } from "../../../constants"

import { PageContainer } from "../../../components/Containers"
import { StatelessSearchWrapper } from "../../../components/InstantSearchWrapper"

import Sidebar from "./Sidebar"
import InfinitePosts from "../InfinitePostsList"

const Layout = styled.div`
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		display: grid;
		grid-template-columns: 1fr minmax(220px, 25%);
		gap: var(--spacing3);
	}
`

const BlogTagPage = ({ currentBreakpoint, match }) => {
	const isMobile = currentBreakpoint <= 1

	const { tag } = match.params

	return (
		<>
			<StatelessSearchWrapper
				indexName={CONST.BLOG_POST_ALGOLIA_INDEX}
				refinements={{ tags: [tag] }}
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
)(BlogTagPage)
