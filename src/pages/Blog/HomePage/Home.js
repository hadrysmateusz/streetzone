import React from "react"
import { withBreakpoints } from "react-breakpoints"

import { CONST } from "../../../constants"
import { route } from "../../../utils"

import { PageContainer } from "../../../components/Containers"
import { SearchWrapper } from "../../../components/InstantSearchWrapper"
import { SmallDropCard, PostCard } from "../../../components/Cards"
import { ThematicGroup } from "../../../components/ThematicGroup"

import PromotedSection from "./PromotedSection"
import Sidebar from "./Sidebar"
import CategoryNav from "./CategoryNav"
import InfinitePosts from "../InfinitePostsList"
import { Layout } from "./Common"

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
							<CategoryNav />
							<ThematicGroup
								index={CONST.BLOG_DROP_ALGOLIA_INDEX}
								title="Nadchodzące Dropy"
								linkTo={route("DROPS")}
								hasMore
								component={SmallDropCard}
							/>
							<ThematicGroup
								index={CONST.BLOG_POST_ALGOLIA_INDEX}
								title="Czyszczenie i Pielęgnacja"
								linkTo={route("BLOG_TAG", {
									tag: "Czyszczenie i Pielęgnacja"
								})}
								hasMore
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
