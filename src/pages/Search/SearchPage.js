import { connectStateResults } from "react-instantsearch-dom"
import { withBreakpoints } from "react-breakpoints"

import { CONST } from "../../constants"

import { StatelessSearchWrapper } from "../../components/InstantSearchWrapper"
import AlgoliaSearchBox from "../../components/Algolia/AlgoliaSearchBox"
import { SmallDropCard, SmallItemCard } from "../../components/Cards"
import { DumbThematicGroup } from "../../components/ThematicGroup"
import IndexResults from "../../components/Algolia/IndexResults"
import { TextBlock } from "../../components/StyledComponents"
import { PageContainer } from "../../components/Containers"
import { ItemsGrid } from "../../components/ItemsView"
import HelmetBasics from "../../components/HelmetBasics"
import { InfinitePosts } from "../../components/InfinitePostsList"

import {
  ContentContainer,
  Layout,
  OuterContainer,
  Section,
  TopContainer,
} from "./SearchPage.styles"

const SearchState = connectStateResults(({ searchState, children }) => {
  const isQueryEmpty = !searchState || (searchState && !searchState.query)
  return isQueryEmpty ? null : children
})

const SearchPage = ({ currentBreakpoint }) => {
  const isMobile = +currentBreakpoint === 0

  return (
    <OuterContainer>
      <HelmetBasics title="Szukaj na stronie" />
      <StatelessSearchWrapper indexName={CONST.BLOG_POST_ALGOLIA_INDEX}>
        <TopContainer>
          <PageContainer>
            <TextBlock size="xl" bold>
              Szukaj
            </TextBlock>
            <AlgoliaSearchBox
              placeholder="Szukaj"
              placeholderLong="Szukaj na tablicy, blogu i w dropach"
            />
          </PageContainer>
        </TopContainer>
        <PageContainer>
          <Layout>
            <ContentContainer>
              <SearchState>
                <Section>
                  <IndexResults
                    indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
                    title="Tablica"
                    limit={9}
                  >
                    {(results) =>
                      isMobile ? (
                        <DumbThematicGroup results={results} component={SmallItemCard} />
                      ) : (
                        <ItemsGrid>
                          {results.map((item) => (
                            <SmallItemCard {...item} key={item.id} />
                          ))}
                        </ItemsGrid>
                      )
                    }
                  </IndexResults>
                </Section>

                <Section>
                  <IndexResults indexName={CONST.BLOG_DROP_ALGOLIA_INDEX} title="Dropy" limit={6}>
                    {(results) =>
                      isMobile ? (
                        <DumbThematicGroup results={results} component={SmallItemCard} />
                      ) : (
                        <ItemsGrid>
                          {results.map((drop) => (
                            <SmallDropCard {...drop} key={drop.id} />
                          ))}
                        </ItemsGrid>
                      )
                    }
                  </IndexResults>
                </Section>

                <Section>
                  <IndexResults indexName={CONST.BLOG_POST_ALGOLIA_INDEX} title="Artykuły">
                    <InfinitePosts />
                  </IndexResults>
                </Section>
              </SearchState>
            </ContentContainer>
          </Layout>
        </PageContainer>
      </StatelessSearchWrapper>
    </OuterContainer>
  )
}

export default withBreakpoints(SearchPage)
