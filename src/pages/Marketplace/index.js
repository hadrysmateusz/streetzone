import React, { useState, useRef } from "react"
import styled from "styled-components/macro"
import { withBreakpoints } from "react-breakpoints"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import CurrentFilters from "../../components/CurrentFilters"
import sortingOptions from "../../constants/sortingOptions"
import ScrollToTop from "../../components/ScrollToTop"
import Topbar from "../../components/Topbar"
import { SearchWrapper } from "../../components/InstantSearchWrapper"
import { PageContainer } from "../../components/Containers"

import PromotedSection from "./PromotedSection"
import Header from "./Header"
import Filters from "./Filters"
import MarketplaceResults from "./MarketplaceResults"
import { MainGrid, Sidebar, GridContainer } from "./StyledComponents"

import { CONST } from "../../constants"

const FiltersHeader = styled.div`
	text-align: center;
	padding: var(--spacing2);
	font-size: var(--fs-l);
	font-weight: bold;
	border-bottom: 1px solid var(--gray75);
`

const DEFAULT_SEARCH_STATE = {
	sortBy: sortingOptions[0].value
}

const MarketplacePage = ({ currentBreakpoint }) => {
	const [areFiltersOpen, setAreFiltersOpen] = useState(false)
	const [clearFilters, setClearFilters] = useState(false)

	const filtersRef = useRef()

	const toggleFilters = () => {
		if (areFiltersOpen) {
			enableBodyScroll(filtersRef.current)
		} else {
			disableBodyScroll(filtersRef.current)
		}

		setAreFiltersOpen((state) => !state)
	}

	if (currentBreakpoint > 0) {
		enableBodyScroll(filtersRef.current)
	}

	return (
		<SearchWrapper
			indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
			initialState={DEFAULT_SEARCH_STATE}
			allowedKeys={["category", "designers", "price", "size"]}
			hitsPerPage={4}
		>
			<Header />
			<PromotedSection />
			<PageContainer extraWide>
				<GridContainer>
					<Topbar toggleFilters={toggleFilters} clearFilters={setClearFilters} />

					<CurrentFilters
						toggle={toggleFilters}
						clear={{
							value: clearFilters,
							update: setClearFilters
						}}
					/>

					<MainGrid>
						<Sidebar hidden={!areFiltersOpen && !(currentBreakpoint > 2)}>
							<FiltersHeader>Filtruj</FiltersHeader>
							<Filters
								toggle={toggleFilters}
								clear={{
									value: clearFilters,
									update: setClearFilters
								}}
							/>
						</Sidebar>
						<MarketplaceResults />
					</MainGrid>
				</GridContainer>
			</PageContainer>
			<ScrollToTop>
				<FontAwesomeIcon icon="long-arrow-alt-up" />
			</ScrollToTop>
		</SearchWrapper>
	)
}

export default withBreakpoints(MarketplacePage)
