import React, { Component } from "react"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import equal from "deep-equal"
import cloneDeep from "clone-deep"

import { withFirebase } from "../Firebase"
import sortingOptions from "./sortingOptions"
import Filters from "./Filters"
import { AlgoliaInfiniteHits } from "../Algolia/AlgoliaHits"
import AlgoliaSortBy from "../Algolia/AlgoliaSortBy"
import AlgoliaSearchBox from "../Algolia/AlgoliaSearchBox"
import {
	Topbar,
	TopbarInnerContainer,
	FiltersToggle,
	MainGrid,
	Sidebar,
	SidebarInner,
	Content,
	RefreshButton,
	StyledInstantSearch
} from "./StyledComponents"
import ScrollToTop from "../ScrollToTop"

const DEFAULT_SORTING = "dev_items_createdAt_desc"
const DEFAULT_SEARCH_STATE = {
	refinementList: {},
	hitsPerPage: 12,
	sortBy: DEFAULT_SORTING,
	query: "",
	page: 1
}

const updateAfter = 700

const createURL = (state) => `?search=${btoa(JSON.stringify(state))}`

class HomePage extends Component {
	state = {
		areFiltersOpen: this.props.currentBreakpoint > 1,
		searchState: null,
		isLoading: true,
		refreshAlgolia: false
	}

	componentDidMount() {
		const searchState = this.urlToState()
		this.setState({ searchState, isLoading: false })
	}

	refreshAlgolia = () => {
		this.setState({ refreshAlgolia: true }, () => {
			this.setState({ refreshAlgolia: false })
		})
	}

	urlToState = () => {
		let searchState = DEFAULT_SEARCH_STATE

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
			debugger
		} catch (e) {
			console.log(e)
			// if there was a problem while parsing, use default state instead
			searchState = DEFAULT_SEARCH_STATE
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
		oldState.page = null
		newState.page = null
		const areEqual = equal(newState, oldState)
		if (!areEqual) {
			console.log("should scroll")
			document.getElementById("App-Element").scrollIntoView(true)
		}
	}

	onSearchStateChange = (searchState) => {
		const _searchState = cloneDeep(searchState)

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
		this.setState((state) => {
			const { areFiltersOpen } = state
			return { areFiltersOpen: !areFiltersOpen }
		})
	}

	refresh = (e) => {
		const target = e.currentTarget
		target.classList.remove("spin")
		target.classList.add("spin")
		this.refreshAlgolia()
		document.getElementById("App-Element").scrollIntoView(true)
		setTimeout(() => target.classList.remove("spin"), 1500)
	}

	render() {
		const { areFiltersOpen, searchState } = this.state
		const { currentBreakpoint } = this.props

		const filterText =
			currentBreakpoint < 1 ? "Filtry" : areFiltersOpen ? "Ukryj filtry" : "Pokaż filtry"

		return this.state.isLoading ? null : (
			<StyledInstantSearch
				appId={process.env.REACT_APP_APP_ID}
				apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
				indexName="dev_items"
				searchState={searchState}
				onSearchStateChange={this.onSearchStateChange}
				createURL={createURL}
				refresh={this.state.refreshAlgolia}
			>
				<Topbar>
					<TopbarInnerContainer>
						<FiltersToggle onClick={this.toggleFilters}>
							<FontAwesomeIcon icon="filter" />
							<span>{filterText}</span>
						</FiltersToggle>
						<RefreshButton title="Odśwież" onClick={this.refresh}>
							<FontAwesomeIcon icon="sync-alt" />
						</RefreshButton>
						<AlgoliaSearchBox />
						<AlgoliaSortBy
							options={sortingOptions}
							defaultOption="dev_items_createdAt_desc"
						/>
					</TopbarInnerContainer>
				</Topbar>

				<MainGrid>
					<Sidebar hidden={!areFiltersOpen}>
						<SidebarInner id="filters-container">
							<Filters toggleFilters={this.toggleFilters} />
						</SidebarInner>
					</Sidebar>

					<Content>
						<AlgoliaInfiniteHits />
					</Content>
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
