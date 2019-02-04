import React, { Component } from "react"
import { /* InstantSearch, */ Configure } from "react-instantsearch-dom"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import qs from "qs"
import equal from "deep-equal"

import getItemsPerPage from "../../utils/getItemsPerPage"
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

const updateAfter = 700

const createURL = (state) => `?${qs.stringify(state)}`

const searchStateToUrl = (props, searchState) =>
	searchState ? `${props.location.pathname}${createURL(searchState)}` : ""
const urlToSearchState = (location) => qs.parse(location.search.slice(1))

class HomePage extends Component {
	state = {
		noMoreItems: false,
		areFiltersOpen: this.props.currentBreakpoint > 1,
		searchState: { ...urlToSearchState(this.props.location), page: 1 },
		refreshAlgolia: false
	}

	refreshAlgolia = () => {
		this.setState({ refreshAlgolia: true }, () => {
			this.setState({ refreshAlgolia: false })
		})
	}

	componentDidUpdate(prevProps) {
		if (prevProps.location !== this.props.location) {
			this.setState({ searchState: urlToSearchState(this.props.location) })
		}
	}

	onSearchStateChange = (searchState) => {
		// get copies of current and prev states and compare all values except for page
		// to determine whether the component should scroll back to the top
		let _oldState = { ...this.state.searchState, page: null }
		let _newState = { ...searchState, page: null }
		const areEqual = equal(_newState, _oldState)
		if (!areEqual) {
			console.log("should scroll")
			document.getElementById("App-Element").scrollIntoView(true)
		}

		clearTimeout(this.debouncedSetState)
		this.debouncedSetState = setTimeout(async () => {
			this.props.history.push(searchStateToUrl(this.props, searchState), searchState)
		}, updateAfter)
		this.setState({ searchState })
	}

	toggleFilters = () => {
		this.setState((state) => {
			const { areFiltersOpen } = state
			return { areFiltersOpen: !areFiltersOpen }
		})
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
				<Configure hitsPerPage={12} />

				<Topbar>
					<TopbarInnerContainer>
						<FiltersToggle onClick={this.toggleFilters}>
							<FontAwesomeIcon icon="filter" />
							<span>{filterText}</span>
						</FiltersToggle>
						<RefreshButton
							title="Odśwież"
							onClick={(e) => {
								const target = e.currentTarget
								target.classList.remove("spin")
								target.classList.add("spin")
								this.refreshAlgolia()
								document.getElementById("App-Element").scrollIntoView(true)
								setTimeout(() => target.classList.remove("spin"), 1500)
							}}
						>
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
