import React, { useState, useRef, useLayoutEffect } from "react"
import styled from "styled-components/macro"
import { withBreakpoints } from "react-breakpoints"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import { Link } from "react-router-dom"

import { SearchWrapper } from "../../components/InstantSearchWrapper"
import CurrentFilters from "../../components/CurrentFilters"
import { PageContainer } from "../../components/Containers"
import ScrollToTop from "../../components/ScrollToTop"
import HelmetBasics from "../../components/HelmetBasics"

import { CONST } from "../../constants"

import Topbar from "./Topbar"
import PromotedSection from "./PromotedSection"
import DesignerBanner from "./DesignerBanner"
import Filters from "./Filters"
import MarketplaceResults from "./MarketplaceResults"
import Button from "../../components/Button"
import { route } from "../../utils"

const sortingOptions = [
  {
    value: CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX,
    label: "Najnowsze",
  },
  {
    value: CONST.ITEMS_MARKETPLACE_PRICE_ASC_ALGOLIA_INDEX,
    label: "Cena rosnąco",
  },
]

const MainGrid = styled.div`
  position: relative;
  @media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
    display: grid;
    grid-template-columns: 270px 1fr;
    gap: var(--spacing3);
  }
`

const Sidebar = styled.aside`
  align-self: flex-start;

  /* mobile */
  @media (max-width: ${(p) => p.theme.breakpoints[3] - 1}px) {
    width: 0;
    margin: 0;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
  }
`

const SidebarInner = styled.div`
  border: 1px solid var(--gray75);
  background: white;
`

const GridContainer = styled.div`
  display: grid;
  gap: var(--spacing3);
`

const FiltersHeader = styled.div`
  text-align: center;
  padding: var(--spacing2);
  font-size: var(--fs-l);
  font-weight: bold;
  border-bottom: 1px solid var(--gray75);
`

const StartSellingBox = styled.div`
  background: var(--black25);
  color: var(--gray75);
  font-size: var(--fs-s);
  padding: 16px;
  margin-top: 16px;

  .ssb-heading {
    text-transform: uppercase;
    color: white;
    margin-bottom: 6px;
    font-weight: 700;
  }

  .ssb-body {
    margin-bottom: 14px;
  }
`

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
    <SearchWrapper
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

          <CurrentFilters toggle={toggleFilters} clearFilters={clearFiltersFn} />

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
    </SearchWrapper>
  )
}

export default withBreakpoints(MarketplacePage)
