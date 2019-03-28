import React, { Component, useState, useEffect } from "react"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"
import equal from "deep-equal"
import cloneDeep from "clone-deep"
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks
} from "body-scroll-lock"
import { withRouter } from "react-router-dom"

import { withFirebase } from "../../components/Firebase"
import AlgoliaResults from "../../components/Algolia/AlgoliaResults"
import LoadingSpinner from "../../components/LoadingSpinner"
import CurrentFilters from "../../components/CurrentFilters"
import sortingOptions from "../../constants/sortingOptions"
import ScrollToTop from "../../components/ScrollToTop"
import Filters from "../../components/Filters"
import Topbar from "../../components/Topbar"
import { TextBlock } from "../../components/StyledComponents"

import { MainGrid, Sidebar, GridContainer } from "./StyledComponents"
import { CONST } from "../../constants"
import { InstantSearch } from "react-instantsearch-dom"

const DEFAULT_SORTING = sortingOptions[0].value
const DEFAULT_HITS_PER_PAGE = 12
const DEFAULT_SEARCH_STATE = Object.freeze({
	hitsPerPage: DEFAULT_HITS_PER_PAGE,
	sortBy: DEFAULT_SORTING,
	refinementList: {},
	query: "",
	page: 1
})

const createURL = (state) => `?search=${btoa(JSON.stringify(state))}`

const AlgoliaSearchContainer = withRouter(
	({
		indexName,
		onSearchStateChange,
		urlToState,
		children,
		history,
		location,
		...rest
	}) => {
		const [searchState, setSearchState] = useState(DEFAULT_SEARCH_STATE)
		const [shouldRefresh, setShouldRefresh] = useState(false)

		useEffect(() => {
			const state = createStateFromURL()
			setSearchState(state)
		}, [location])

		useEffect(() => {
			/* this is required in order for the component to not get stuck on a later
		page without the ability to navigate back other than clearing all filters */

			let newState = { ...searchState, page: 1 }
			debugger
			setSearchState(newState)
		}, [])

		const refresh = () => {
			setShouldRefresh(true)
			setShouldRefresh(false)
		}

		const shouldScroll = (oldState, newState) => {
			/* get copies of current and prev states and compare all values except for page
		to determine whether the component should scroll back to the top */
			const _oldState = { ...oldState, page: null }
			const _newState = { ...newState, page: null }
			const areEqual = equal(_newState, _oldState)
			if (!areEqual) {
				window.scrollTo(0, 0)
			}
		}

		const handleSearchStateChange = async (newSearchState) => {
			// const _newSearchState = await cloneDeep(newSearchState)

			// shouldScroll(cloneDeep(searchState), _newSearchState)

			const formattedState = await onSearchStateChange(newSearchState)
			const url = createURL(formattedState)
			debugger
			history.push(url)

			// update the searchState (to increase apparent performance)
			// setSearchState(newSearchState)
		}

		const createStateFromURL = () => {
			try {
				// get the encoded search parameter from URL
				var searchParams = new URLSearchParams(location.search)
				const search = searchParams.get("search")

				// decode and parse the search paramter
				const convertedSearch = atob(search)
				const parsedSearch = JSON.parse(convertedSearch)

				const formattedState = urlToState(parsedSearch)
				debugger
				return formattedState
			} catch (e) {
				console.log(e)
				// if there was a problem while parsing, use default state instead
				return DEFAULT_SEARCH_STATE
			}
		}

		return (
			<InstantSearch
				appId={process.env.REACT_APP_APP_ID}
				apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
				indexName={CONST.DEV_ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
				searchState={searchState}
				onSearchStateChange={handleSearchStateChange}
				createURL={createURL}
				refresh={shouldRefresh}
				{...rest}
			>
				{children}
			</InstantSearch>
		)
	}
)

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
