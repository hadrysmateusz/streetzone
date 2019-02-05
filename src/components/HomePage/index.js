import React, { Component } from "react"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import equal from "deep-equal"

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
	range: {},
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
		searchState: DEFAULT_SEARCH_STATE,
		refreshAlgolia: false
	}

	refreshAlgolia = () => {
		this.setState({ refreshAlgolia: true }, () => {
			this.setState({ refreshAlgolia: false })
		})
	}

	componentDidUpdate(prevProps) {
		if (prevProps.location !== this.props.location) {
			let searchState = DEFAULT_SEARCH_STATE

			try {
				var searchParams = new URLSearchParams(this.props.location.search)
				const search = searchParams.get("search")
				console.log("search: ", search)
				const convertedSearch = atob(search)
				console.log("convertedSearch: ", convertedSearch)
				const parsedSearch = JSON.parse(convertedSearch)
				console.log("parsedSearch: ", parsedSearch)

				const { category, designers, size, price, sortBy, query, page } = parsedSearch

				if (category) searchState.refinementList.category = category
				if (designers) searchState.refinementList.designers = designers
				if (size) searchState.refinementList.size = size
				if (price) searchState.range.price = price
				if (sortBy) searchState.sortBy = sortBy
				if (query) searchState.query = query
				if (page) searchState.page = page
			} catch (e) {
				searchState = DEFAULT_SEARCH_STATE
			}

			this.setState({ searchState }, () =>
				console.log("postUpdate search", this.state.searchState)
			)
		}
	}

	onSearchStateChange = (searchState) => {
		// get copies of current and prev states and compare all values except for page
		// to determine whether the component should scroll back to the top
		let _oldState = { ...this.state.searchState, page: null }
		let _newState = { ...searchState, page: null }
		const areEqual = equal(_newState, _oldState)
		console.log(_oldState, _newState, areEqual)
		if (!areEqual) {
			console.log("should scroll")
			document.getElementById("App-Element").scrollIntoView(true)
		}

		// format the state to keep the url relatively short
		const { refinementList, query, range, sortBy, page } = searchState
		let formattedState = {}
		if (refinementList) {
			if (refinementList.category) formattedState.category = refinementList.category
			if (refinementList.designers) formattedState.designers = refinementList.designers
			if (refinementList.size) formattedState.size = refinementList.size
		}
		if (page) formattedState.page = page
		if (query) formattedState.query = query
		if (sortBy) formattedState.sortBy = sortBy
		if (range && range.price) formattedState.price = range.price

		clearTimeout(this.debouncedSetState)
		this.debouncedSetState = setTimeout(async () => {
			this.props.history.push(createURL(formattedState))
		}, updateAfter)
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

		return (
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
						<SidebarInner>
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
