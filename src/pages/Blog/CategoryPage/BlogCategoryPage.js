import { withRouter } from "react-router-dom"

import { CONST } from "../../../constants"

import { PopularArticles, PopularTags } from "../../../components/SidebarComponents"
import { StatelessSearchWrapper } from "../../../components/InstantSearchWrapper"
import { LayoutManager, Main, Sidebar } from "../../../components/LayoutManager"
import { PoweredByBox } from "../../../components/Algolia/PoweredBy"
import { PageContainer } from "../../../components/Containers"
import HelmetBasics from "../../../components/HelmetBasics"
import { InfinitePosts } from "../../../components/InfinitePostsList"
import PageNav from "../../../components/PageNav"

import { Heading } from "../Common.styles"

const sidebarElements = [
  { title: "Popularne artykuły", component: PopularArticles },
  { title: "Popularne tagi", component: PopularTags },
]

const BlogCategoryPage = ({ match }) => {
  const { category } = match.params

  return (
    <StatelessSearchWrapper
      indexName={CONST.BLOG_POST_ALGOLIA_INDEX}
      refinements={{ category }}
      hitsPerPage={6}
    >
      <HelmetBasics title={`${category} - Blog`} />
      <PageContainer>
        <LayoutManager>
          <Main>
            <PageNav
              breadcrumbs={[
                ["Blog", "BLOG_HOME"],
                [category, "BLOG_CATEGORY", { category: category }],
              ]}
              noMargin
            />
            <Heading category={category}>{category}</Heading>
            <InfinitePosts />
          </Main>
          <Sidebar availableElements={sidebarElements} isRandom>
            <PoweredByBox />
          </Sidebar>
        </LayoutManager>
      </PageContainer>
    </StatelessSearchWrapper>
  )
}

export default withRouter(BlogCategoryPage)
