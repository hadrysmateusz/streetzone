import BlackBox from "../../../components/BlackBox"
import { BigDropCard } from "../../../components/Cards"
import { PageContainer } from "../../../components/Containers"
import { LayoutManager, Main, Sidebar } from "../../../components/LayoutManager"
import { PopularArticles } from "../../../components/SidebarComponents"
import InfiniteScrollingResults from "../../../components/InfiniteScrollingResults"
import { ResultsCount } from "../../../components/ResultsCount"
import HelmetBasics from "../../../components/HelmetBasics"

import { useAuthentication } from "../../../hooks"

import sections from "./sections"
import SectionSelect from "./SectionSelect"
import withDropsSearchWrapper from "./SearchWrapperSelector"
import { Header, HeaderContainer, ResultsContainer } from "./DropsPage.styles"
// import PromotedSection from "./PromotedSection"
// import Filters from "./Filters"

const sidebarElements = [{ title: "Popularne na blogu", component: PopularArticles }]

const DropsMain = withDropsSearchWrapper(({ currentSection }) => {
  // const isArchive = currentSection.id === "archive"
  const authUser = useAuthentication()

  const isAuthenticated = !!authUser

  return (
    <PageContainer>
      <HelmetBasics title={currentSection.pageTitle} />
      <LayoutManager>
        <Main>
          <HeaderContainer>
            <Header>Dropy</Header>
            <ResultsCount />
          </HeaderContainer>

          <SectionSelect sections={sections.list()} currentSection={currentSection} />

          {/* {isArchive && (
						// TODO: better / more accurate copy (with regards to final functionality)
						<BlackBox header="Dropy Archiwalne">
							Tutaj znajdują się dropy które miały już miejsce.{" "}
						</BlackBox>
					)} */}

          <InfiniteScrollingResults>
            {({ results }) => (
              <ResultsContainer>
                {results.map((drop) => (
                  <BigDropCard {...drop} key={drop.id} />
                ))}
              </ResultsContainer>
            )}
          </InfiniteScrollingResults>
        </Main>
        <Sidebar availableElements={sidebarElements} isRandom>
          {/* {isArchive && <Filters toggle={() => null} clear={() => null} />} */}
          {!isAuthenticated && (
            <BlackBox header="Otrzymuj powiadomienia">
              Utwórz konto by dostawać powiadomienia o nowych dropach
            </BlackBox>
          )}
        </Sidebar>
      </LayoutManager>
    </PageContainer>
  )
})

const DropsPage = () => (
  <>
    {/* <PromotedSection /> */}
    <DropsMain />
  </>
)

export default DropsPage
