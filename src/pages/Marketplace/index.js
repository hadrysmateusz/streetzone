import React, { useState, useRef } from "react"
import styled from "styled-components/macro"
import { withBreakpoints } from "react-breakpoints"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"

import { SearchWrapper } from "../../components/InstantSearchWrapper"
import CurrentFilters from "../../components/CurrentFilters"
import { PageContainer } from "../../components/Containers"
import ScrollToTop from "../../components/ScrollToTop"
import HelmetBasics from "../../components/HelmetBasics"

import { CONST } from "../../constants"

import Topbar from "./Topbar"
import PromotedSection from "./PromotedSection"
import Header from "./Header"
import Filters from "./Filters"
import MarketplaceResults from "./MarketplaceResults"

const sortingOptions = [
	{
		value: CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX,
		label: "Najnowsze"
	},
	{
		value: CONST.ITEMS_MARKETPLACE_PRICE_ASC_ALGOLIA_INDEX,
		label: "Cena rosnąco"
	}
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
	border: 1px solid var(--gray75);
	background: white;

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

const DEFAULT_SEARCH_STATE = {
	sortBy: sortingOptions[0].value
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

	if (currentBreakpoint > 0) {
		enableBodyScroll(filtersRef.current)
	}

	const clearFiltersFn = () => {
		setClearFilters(true)
	}

	return (
		<SearchWrapper
			indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
			initialState={DEFAULT_SEARCH_STATE}
			allowedKeys={["category", "designers", "price", "size"]}
			hitsPerPage={4}
		>
			<HelmetBasics title="Tablica" />
			<Header />
			<PromotedSection />
			<PageContainer extraWide>
				<GridContainer>
					<Topbar toggleFilters={toggleFilters} sortingOptions={sortingOptions} />

					<CurrentFilters toggle={toggleFilters} clearFilters={clearFiltersFn} />

					<MainGrid>
						<Sidebar hidden={!areFiltersOpen && !(currentBreakpoint > 2)}>
							<FiltersHeader>Filtruj</FiltersHeader>
							<Filters
								toggle={toggleFilters}
								clear={clearFiltersFn}
								shouldClear={{ value: clearFilters, update: setClearFilters }}
							/>
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
