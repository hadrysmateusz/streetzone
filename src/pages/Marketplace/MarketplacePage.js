import { useState, useRef, useLayoutEffect } from "react"
import { withBreakpoints } from "react-breakpoints"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import { Link } from "react-router-dom"

import { StatefulSearchWrapper } from "../../components/InstantSearchWrapper"
import CurrentFilters from "../../components/CurrentFilters"
import { PageContainer } from "../../components/Containers"
import ScrollToTop from "../../components/ScrollToTop"
import HelmetBasics from "../../components/HelmetBasics"
import { Button } from "../../components/Button"

import { CONST } from "../../constants"
import { route } from "../../utils"

import MarketplaceResults from "./MarketplaceResults"
import PromotedSection from "./PromotedSection"
import DesignerBanner from "./DesignerBanner"
import { Topbar } from "./Topbar"
import Filters from "./Filters"
import { sortingOptions } from "./sortingOptions"
import {
  FiltersHeader,
  GridContainer,
  MainGrid,
  Sidebar,
  SidebarInner,
  StartSellingBox,
} from "./MarketplacePage.styles"

const DEFAULT_SEARCH_STATE = {
  sortBy: sortingOptions[0].value,
}

const MarketplacePage = ({ currentBreakpoint }) => {
  const [areFiltersOpen, setAreFiltersOpen] = useState(false)
  const [clearFilters, setClearFilters] = useState(false)

  // TODO: as far as I know this ref is not connected to any component
  const filtersRef = useRef()

  const toggleFilters = () => {
    if (areFiltersOpen) {
      enableBodyScroll(filtersRef.current)
    } else {
      disableBodyScroll(filtersRef.current)
    }

    setAreFiltersOpen((state) => !state)
  }

  useLayoutEffect(() => {
    if (currentBreakpoint > 0) {
      enableBodyScroll(filtersRef.current)
    }
  }, [currentBreakpoint])

  const clearFiltersFn = () => {
    setClearFilters(true)
  }

  return (
    <StatefulSearchWrapper
      indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
      initialState={DEFAULT_SEARCH_STATE}
      allowedKeys={["category", "designers", "price", "size"]}
      hitsPerPage={12}
    >
      <HelmetBasics title="Tablica" />
      <DesignerBanner />
      <PromotedSection />
      <PageContainer extraWide>
        <GridContainer>
          <Topbar toggleFilters={toggleFilters} sortingOptions={sortingOptions} />

          <CurrentFilters clearFilters={clearFiltersFn} />

          <MainGrid>
            <Sidebar hidden={!areFiltersOpen && !(currentBreakpoint > 2)}>
              <SidebarInner>
                <FiltersHeader>Filtruj</FiltersHeader>
                <Filters
                  toggle={toggleFilters}
                  clear={clearFiltersFn}
                  shouldClear={{ value: clearFilters, update: setClearFilters }}
                />
              </SidebarInner>
              <StartSellingBox>
                <div className="ssb-heading">Wystaw Przedmiot</div>
                <div className="ssb-body">I zacznij zarabiać na swojej kolekcji!</div>
                <Link to={route("NEW_ITEM")}>
                  <Button blackBox>Zacznij Sprzedawać</Button>
                </Link>
              </StartSellingBox>
            </Sidebar>
            <MarketplaceResults />
          </MainGrid>
        </GridContainer>
      </PageContainer>
      <ScrollToTop />
    </StatefulSearchWrapper>
  )
}

export default withBreakpoints(MarketplacePage)
