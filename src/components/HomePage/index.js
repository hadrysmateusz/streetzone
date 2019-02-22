import React, { Component } from "react"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"
import equal from "deep-equal"
import cloneDeep from "clone-deep"
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks
} from "body-scroll-lock"

import { withFirebase } from "../Firebase"
import Filters from "./Filters"
import AlgoliaResults from "../Algolia/AlgoliaResults"
import { MainGrid, Sidebar, SidebarInner, StyledInstantSearch } from "./StyledComponents"
import ScrollToTop from "../ScrollToTop"
import LoadingSpinner from "../LoadingSpinner"
import Topbar from "../Topbar"
import CurrentFiltersView from "./CurrentFiltersView"

const DEFAULT_SORTING = "dev_items_createdAt_desc"
const DEFAULT_HITS_PER_PAGE = 12
const DEFAULT_SEARCH_STATE = Object.freeze({
	hitsPerPage: DEFAULT_HITS_PER_PAGE,
	sortBy: DEFAULT_SORTING,
	refinementList: {},
	query: "",
	page: 1
})

const createURL = (state) => `?search=${btoa(JSON.stringify(state))}`

class HomePage extends Component {
	state = {
		areFiltersOpen: this.props.currentBreakpoint > 1,
		searchState: null,
		isLoading: true,
		refreshAlgolia: false,
		clearFilters: false
	}

	targetElement = null

	setClearFiltersFlag = (to) => {
		return this.setState({ clearFilters: to })
	}

	componentDidMount() {
		/* this is required in order for the component to not get stuck on a later
		page without the ability to navigate back other than clearing all filters */
		let searchState = { ...this.urlToState(), page: 1 }

		this.targetElement = document.querySelector("#filters-container")

		this.setState({ searchState, isLoading: false })
	}

	refreshAlgolia = () => {
		this.setState({ refreshAlgolia: true }, () => {
			this.setState({ refreshAlgolia: false })
		})
	}

	urlToState = () => {
		let searchState = cloneDeep(DEFAULT_SEARCH_STATE)

		try {
			// get the encoded search parameter from URL
			var searchParams = new URLSearchParams(this.props.location.search)
			const search = searchParams.get("search")

			// decode and parse the search paramter
			const convertedSearch = atob(search)
			const parsedSearch = JSON.parse(convertedSearch)

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
		} catch (e) {
			console.log(e)
			// if there was a problem while parsing, use default state instead
			return DEFAULT_SEARCH_STATE
		}
		return searchState
	}

	componentDidUpdate(prevProps) {
		if (prevProps.location !== this.props.location) {
			const searchState = this.urlToState()
			this.setState({ searchState })
		}
	}

	shouldScroll = (oldState, newState) => {
		/* get copies of current and prev states and compare all values except for page
		to determine whether the component should scroll back to the top */
		const _oldState = { ...oldState, page: null }
		const _newState = { ...newState, page: null }
		const areEqual = equal(_newState, _oldState)
		if (!areEqual) {
			document.getElementById("App-Element").scrollIntoView(true)
		}
	}

	onSearchStateChange = async (searchState) => {
		const _searchState = await cloneDeep(searchState)

		this.shouldScroll(cloneDeep(this.state.searchState), _searchState)

		// format the state to keep the url relatively short
		const { refinementList, query, range, sortBy, page } = _searchState
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

		this.props.history.push(createURL(formattedState))

		// update the searchState (to increase apparent performance)
		this.setState({ searchState })
	}

	toggleFilters = () => {
		if (this.props.currentBreakpoint > 0) {
			enableBodyScroll(this.targetElement)
		} else {
			const wasOpen = this.state.areFiltersOpen
			if (wasOpen) {
				enableBodyScroll(this.targetElement)
			} else {
				disableBodyScroll(this.targetElement)
			}
		}

		this.setState((state) => {
			const { areFiltersOpen } = state
			return { areFiltersOpen: !areFiltersOpen }
		})
	}

	refresh = (e) => {
		// Start the button animation
		const target = e.currentTarget
		target.classList.remove("spin")
		target.classList.add("spin")

		// Refresh Algolia cache
		this.refreshAlgolia()

		// Scroll to top
		document.getElementById("App-Element").scrollIntoView(true)

		// End the animation
		setTimeout(() => target.classList.remove("spin"), 1500)
	}

	componentWillUnmount() {
		clearAllBodyScrollLocks()
	}

	render() {
		const { areFiltersOpen, searchState } = this.state
		const { currentBreakpoint } = this.props

		return this.state.isLoading ? (
			<LoadingSpinner />
		) : (
			<StyledInstantSearch
				appId={process.env.REACT_APP_APP_ID}
				apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
				indexName="dev_items"
				searchState={searchState}
				onSearchStateChange={this.onSearchStateChange}
				createURL={createURL}
				refresh={this.state.refreshAlgolia}
			>
				<Topbar
					currentBreakpoint={currentBreakpoint}
					areFiltersOpen={areFiltersOpen}
					toggleFilters={this.toggleFilters}
					refresh={this.refresh}
					clearFilters={{
						value: this.state.clearFilters,
						update: this.setClearFiltersFlag
					}}
				/>

				<CurrentFiltersView />
				<MainGrid>
					<Sidebar hidden={!areFiltersOpen}>
						<SidebarInner id="filters-container">
							<Filters
								toggleFilters={this.toggleFilters}
								forceClear={{
									value: this.state.clearFilters,
									update: this.setClearFiltersFlag
								}}
							/>
						</SidebarInner>
					</Sidebar>

					<AlgoliaResults />
				</MainGrid>
				<ScrollToTop>↑</ScrollToTop>
			</StyledInstantSearch>
		)
	}
}

export default compose(
	withBreakpoints,
	withFirebase
)(HomePage)
