import BlackBox from "../../components/BlackBox"
import { BigDealCard } from "../../components/Cards"
import { PageContainer } from "../../components/Containers"
import { LayoutManager, Main, Sidebar } from "../../components/LayoutManager"
import { PopularArticles } from "../../components/SidebarComponents"
import InfiniteScrollingResults from "../../components/InfiniteScrollingResults"
import { StatelessSearchWrapper } from "../../components/InstantSearchWrapper"
import AlgoliaSearchBox from "../../components/Algolia/AlgoliaSearchBox"
import HelmetBasics from "../../components/HelmetBasics"

import { useAuthentication } from "../../hooks"
import { CONST } from "../../constants"

import { Heading, Info, ResultsContainer } from "./DealsPage.styles"

const sidebarElements = [{ title: "Popularne na blogu", component: PopularArticles }]

const DealsPage = () => {
  const authUser = useAuthentication()

  const isAuthenticated = !!authUser

  return (
    <StatelessSearchWrapper indexName={CONST.DEALS_ALGOLIA_INDEX} limit={8} ignoreArchivedStatus>
      <HelmetBasics title="Okazje" />
      <PageContainer>
        <Heading>Okazje</Heading>
        <Info>Tu znajdziesz najlepsze deale na ubrania i buty</Info>

        <LayoutManager>
          <Main>
            <AlgoliaSearchBox
              placeholder="Szukaj"
              placeholderLong="Szukaj po nazwie, marce, itd."
            />

            <InfiniteScrollingResults>
              {({ results }) => (
                <ResultsContainer>
                  {results.map((deal) => (
                    <BigDealCard {...deal} key={deal.id} />
                  ))}
                </ResultsContainer>
              )}
            </InfiniteScrollingResults>
          </Main>
          <Sidebar availableElements={sidebarElements} isRandom>
            {!isAuthenticated && (
              <BlackBox header="Otrzymuj powiadomienia">
                Utwórz konto by dostawać powiadomienia o nowych promocjach
              </BlackBox>
            )}
          </Sidebar>
        </LayoutManager>
      </PageContainer>
    </StatelessSearchWrapper>
  )
}

export default DealsPage
