import React, { Component } from "react"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"
import cloneDeep from "clone-deep"
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks
} from "body-scroll-lock"

import { withFirebase } from "../../components/Firebase"
import AlgoliaResults from "../../components/Algolia/AlgoliaResults"
import CurrentFilters from "../../components/CurrentFilters"
import sortingOptions from "../../constants/sortingOptions"
import ScrollToTop from "../../components/ScrollToTop"
import Filters from "../../components/Filters"
import Topbar from "../../components/Topbar"
import AlgoliaSearchContainer from "../../components/Topbar"

import { MainGrid, Sidebar, GridContainer } from "./StyledComponents"
import { CONST } from "../../constants"

const DEFAULT_SORTING = sortingOptions[0].value
const DEFAULT_HITS_PER_PAGE = 12
const DEFAULT_SEARCH_STATE = Object.freeze({
	hitsPerPage: DEFAULT_HITS_PER_PAGE,
	sortBy: DEFAULT_SORTING,
	refinementList: {},
	query: "",
	page: 1
})

class HomePage extends Component {
	state = {
		areFiltersOpen: this.props.currentBreakpoint > 1,
		searchState: null,
		isLoading: true,
		refreshAlgolia: false,
		clearFilters: false
	}

	targetElement = null

	setClearFiltersFlag = (to) => this.setState({ clearFilters: to })

	componentDidMount() {
		this.targetElement = document.querySelector("#filters-container")
	}

	urlToState = (parsedSearch) => {
		let searchState = cloneDeep(DEFAULT_SEARCH_STATE)
		// format the searchState according to Algolia's spec
		const { category, designers, size, price, sortBy, query, page } = parsedSearch

		searchState.refinementList.category = category || []
		searchState.refinementList.designers = designers || []
		searchState.refinementList.size = size || []
		if (price) {
			searchState.range = {}
			searchState.range.price = price
		} else {
			delete searchState.range
		}
		searchState.sortBy = sortBy || DEFAULT_SORTING
		searchState.query = query || ""
		searchState.page = page || 1

		return searchState
	}

	onSearchStateChange = async (newSearchState) => {
		// format the state to keep the url relatively short
		const { refinementList, query, range, sortBy, page } = newSearchState
		let formattedState = {}
		if (refinementList !== undefined) {
			if (refinementList.category !== undefined)
				formattedState.category = refinementList.category
			if (refinementList.designers !== undefined)
				formattedState.designers = refinementList.designers
			if (refinementList.size !== undefined) formattedState.size = refinementList.size
		}
		if (page !== undefined) formattedState.page = page
		if (query !== undefined) formattedState.query = query
		if (sortBy !== undefined) formattedState.sortBy = sortBy
		if (range && range.price !== undefined) formattedState.price = range.price

		return formattedState
	}

	toggleFilters = () => {
		const wasOpen = this.state.areFiltersOpen
		if (wasOpen) {
			enableBodyScroll(this.targetElement)
		} else {
			disableBodyScroll(this.targetElement)
		}

		this.setState((state) => {
			const { areFiltersOpen } = state
			return { areFiltersOpen: !areFiltersOpen }
		})
	}

	componentWillUnmount() {
		clearAllBodyScrollLocks()
	}

	render() {
		const { areFiltersOpen } = this.state
		const { currentBreakpoint } = this.props

		if (currentBreakpoint > 0) {
			enableBodyScroll(this.targetElement)
		}

		return (
			<AlgoliaSearchContainer
				indexName={CONST.DEV_ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
				onSearchStateChange={this.onSearchStateChange}
				urlToState={this.urlToState}
				defaultSearchState={DEFAULT_SEARCH_STATE}
			>
				{/* <TextBlock bold uppercase>
					🔥 Promowane
				</TextBlock> */}
				<GridContainer>
					<Topbar
						areFiltersOpen={areFiltersOpen}
						toggleFilters={this.toggleFilters}
						clearFilters={this.setClearFiltersFlag}
					/>

					<CurrentFilters
						clearFilters={{
							value: this.state.clearFilters,
							update: this.setClearFiltersFlag
						}}
					/>

					<MainGrid>
						<Sidebar hidden={!areFiltersOpen && !(currentBreakpoint > 0)}>
							<Filters
								toggleFilters={this.toggleFilters}
								clearFilters={{
									value: this.state.clearFilters,
									update: this.setClearFiltersFlag
								}}
							/>
						</Sidebar>
						<AlgoliaResults />
					</MainGrid>
				</GridContainer>
				<ScrollToTop>↑</ScrollToTop>
			</AlgoliaSearchContainer>
		)
	}
}

export default compose(
	withBreakpoints,
	withFirebase
)(HomePage)
