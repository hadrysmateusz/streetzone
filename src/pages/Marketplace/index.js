import React, { useState, useRef } from "react"
import { withBreakpoints } from "react-breakpoints"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import AlgoliaResults from "../../components/Algolia/AlgoliaResults"
import CurrentFilters from "../../components/CurrentFilters"
import sortingOptions from "../../constants/sortingOptions"
import ScrollToTop from "../../components/ScrollToTop"
import Topbar from "../../components/Topbar"
import { SearchWrapper } from "../../components/InstantSearchWrapper"
import { PageContainer, MainPageContainer } from "../../components/Containers"

import PromotedSection from "./PromotedSection"
import Header from "./Header"
import Filters from "./Filters"
import { MainGrid, Sidebar, GridContainer } from "./StyledComponents"

import { CONST } from "../../constants"

const DEFAULT_SEARCH_STATE = {
	hitsPerPage: 12,
	sortBy: sortingOptions[0].value,
	refinementList: {},
	query: "",
	page: 1
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
		>
			<MainPageContainer>
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
							<Sidebar hidden={!areFiltersOpen && !(currentBreakpoint > 0)}>
								<Filters
									toggle={toggleFilters}
									clear={{
										value: clearFilters,
										update: setClearFilters
									}}
								/>
							</Sidebar>
							<AlgoliaResults />
						</MainGrid>
					</GridContainer>
				</PageContainer>
				<ScrollToTop>
					<FontAwesomeIcon icon="long-arrow-alt-up" />
				</ScrollToTop>
			</MainPageContainer>
		</SearchWrapper>
	)
}

export default withBreakpoints(MarketplacePage)
