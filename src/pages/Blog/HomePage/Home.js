import React from "react"
import styled from "styled-components/macro"
import { withBreakpoints } from "react-breakpoints"

import { CONST } from "../../../constants"
import route from "../../../utils/route"

import { PageContainer } from "../../../components/Containers"
import { SearchWrapper } from "../../../components/InstantSearchWrapper"
import { SmallDropCard, PostCard } from "../../../components/Cards"

import PromotedSection from "./PromotedSection"
import ThematicGroup from "./ThematicGroup"
import Sidebar from "./Sidebar"
import InfinitePosts from "../InfinitePostsList"

const Layout = styled.div`
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		display: grid;
		grid-template-columns: 1fr minmax(220px, 25%);
		gap: var(--spacing3);
	}
`

const BlogHomePage = withBreakpoints(({ currentBreakpoint }) => {
	const isMobile = currentBreakpoint <= 1

	return (
		<>
			<PromotedSection />
			<SearchWrapper
				indexName={CONST.BLOG_POST_ALGOLIA_INDEX}
				allowedKeys={["tags"]}
				hitsPerPage={3}
			>
				<PageContainer>
					<Layout>
						{/* Main Content */}
						<main>
							<ThematicGroup
								index={CONST.BLOG_DROP_ALGOLIA_INDEX}
								title="Nadchodzące Dropy"
								linkTo={route("DROPS")}
								component={SmallDropCard}
							/>
							<ThematicGroup
								index={CONST.BLOG_POST_ALGOLIA_INDEX}
								title="Czyszczenie i Pielęgnacja"
								linkTo={route("BLOG_TAG", {
									tag: "Czyszczenie i Pielęgnacja"
								})}
								refinements={{ tags: ["Czyszczenie", "Pielęgnacja"] }}
								component={PostCard}
							/>
							<InfinitePosts />
						</main>
						{/* Sidebar */}
						{!isMobile && <Sidebar />}
					</Layout>
				</PageContainer>
			</SearchWrapper>
		</>
	)
})

export default BlogHomePage
