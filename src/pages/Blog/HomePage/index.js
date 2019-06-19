import React from "react"

import { PageContainer } from "../../../components/Containers"
import { SearchWrapper } from "../../../components/InstantSearchWrapper"
import { SmallDropCard, PostCard } from "../../../components/Cards"
import { ThematicGroup } from "../../../components/ThematicGroup"
import { LayoutManager, Main, Sidebar } from "../../../components/LayoutManager"
import { PoweredByBox } from "../../../components/Algolia/PoweredBy"
import { PopularArticles, PopularTags } from "../../../components/SidebarComponents"

import { CONST } from "../../../constants"
import { route } from "../../../utils"

import PromotedSection from "./PromotedSection"
import CategoryNav from "./CategoryNav"
import InfinitePosts from "../InfinitePostsList"

const sidebarElements = [
	{ title: "Popularne artykuły", component: PopularArticles },
	{ title: "Popularne tagi", component: PopularTags }
]

const DropsGroup = () => (
	<ThematicGroup
		index={CONST.BLOG_DROP_ALGOLIA_INDEX}
		title="Nadchodzące Dropy"
		linkTo={route("DROPS")}
		hasMore
		component={SmallDropCard}
	/>
)

const CareAndMaintenanceGroup = () => (
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
)

const BlogHomePage = () => {
	return (
		<>
			<PromotedSection />
			<SearchWrapper
				indexName={CONST.BLOG_POST_ALGOLIA_INDEX}
				allowedKeys={["tags"]}
				hitsPerPage={3}
			>
				<PageContainer>
					<LayoutManager columns="1fr minmax(220px, 25%)">
						<Main>
							{/* Navigation */}
							<CategoryNav />
							{/* Preset Groups */}
							<DropsGroup />
							<CareAndMaintenanceGroup />
							{/* Infinite Posts List */}
							<InfinitePosts />
						</Main>
						<Sidebar availableElements={sidebarElements} isRandom>
							<PoweredByBox />
						</Sidebar>
					</LayoutManager>
				</PageContainer>
			</SearchWrapper>
		</>
	)
}

export default BlogHomePage
