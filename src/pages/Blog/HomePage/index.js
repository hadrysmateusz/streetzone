import React from "react"

import { PageContainer } from "../../../components/Containers"
import { StatelessSearchWrapper } from "../../../components/InstantSearchWrapper"
import { /*  SmallDropCard, */ PostCard } from "../../../components/Cards"
import { ThematicGroup } from "../../../components/ThematicGroup"
import { LayoutManager, Main, Sidebar } from "../../../components/LayoutManager"
import { PoweredByBox } from "../../../components/Algolia/PoweredBy"
import { PopularArticles, PopularTags } from "../../../components/SidebarComponents"
import HelmetBasics from "../../../components/HelmetBasics"

import { CONST, POST_CATEGORIES } from "../../../constants"
import { route } from "../../../utils"

import PromotedSection from "./PromotedSection"
import CategoryNav from "./CategoryNav"
import InfinitePosts from "../InfinitePostsList"
import { TextBlock } from "../../../components/StyledComponents"

const sidebarElements = [
  { title: "Popularne artykuły", component: PopularArticles },
  { title: "Popularne tagi", component: PopularTags },
]

// const DropsGroup = () => (
// 	<ThematicGroup
// 		index={CONST.BLOG_DROP_ALGOLIA_INDEX}
// 		title="Nadchodzące Dropy"
// 		linkTo={route("DROPS_SECTION", { id: "upcoming" })}
// 		filters={`dropsAtApproxTimestamp > ${Date.now()}`}
// 		component={SmallDropCard}
// 	/>
// )

// const CareAndMaintenanceGroup = () => (
//   <ThematicGroup
//     index={CONST.BLOG_POST_ALGOLIA_INDEX}
//     title="Czyszczenie i Pielęgnacja"
//     linkTo={route("BLOG_TAG", null, { tags: ["Czyszczenie", "Pielęgnacja"] })}
//     // refinements={{ tags: ["Czyszczenie", "Pielęgnacja"] }}
//     component={PostCard}
//   />
// )

const SneakersGroup = () => (
  <ThematicGroup
    index={CONST.BLOG_POST_ALGOLIA_INDEX}
    title={POST_CATEGORIES.SNEAKERS}
    linkTo={route("BLOG_CATEGORY", POST_CATEGORIES.SNEAKERS)}
    refinements={{ category: POST_CATEGORIES.SNEAKERS }}
    component={PostCard}
  />
)

const EventsGroup = () => (
  <ThematicGroup
    index={CONST.BLOG_POST_ALGOLIA_INDEX}
    title={POST_CATEGORIES.EVENT}
    linkTo={route("BLOG_CATEGORY", POST_CATEGORIES.EVENT)}
    refinements={{ category: POST_CATEGORIES.EVENT }}
    component={PostCard}
  />
)

const BlogHomePage = () => {
  return (
    <>
      <HelmetBasics title="Blog" />
      <PromotedSection />
      <StatelessSearchWrapper indexName={CONST.BLOG_POST_ALGOLIA_INDEX} limit={3}>
        <PageContainer>
          <LayoutManager>
            <Main>
              {/* Navigation */}
              <CategoryNav />

              {/* Preset Groups */}
              <SneakersGroup />
              <EventsGroup />
              {/* <CareAndMaintenanceGroup /> */}

              {/* Infinite Posts List */}
              <TextBlock bold uppercase size="m" mb="16px">
                Najnowsze
              </TextBlock>
              <InfinitePosts />
            </Main>
            <Sidebar availableElements={sidebarElements} isRandom>
              <PoweredByBox />
            </Sidebar>
          </LayoutManager>
        </PageContainer>
      </StatelessSearchWrapper>
    </>
  )
}

export default BlogHomePage
