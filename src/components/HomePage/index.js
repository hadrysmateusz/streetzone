import React, { Component } from "react"
import {
	InstantSearch,
	SearchBox,
	ClearRefinements,
	Configure
} from "react-instantsearch-dom"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"
import { Portal } from "react-portal"
import qs from "qs"
import lzString from "lz-string"

import getItemsPerPage from "../../utils/getItemsPerPage"
import sortingOptions from "./sortingOptions"
import AlgoliaInfiniteHits, { AlgoliaHits } from "../Algolia/AlgoliaInfiniteHits"
import { withFirebase } from "../Firebase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AlgoliaSortBy from "../Algolia/AlgoliaSortBy"
import {
	Topbar,
	TopbarInnerContainer,
	FiltersToggle,
	MainGrid,
	Sidebar,
	SidebarInner,
	Content,
	FullscreenFilters,
	FiltersHeader,
	StyledPagination
} from "./StyledComponents"
import Filters from "./Filters"

const updateAfter = 700

const createURL = (state) => `?${qs.stringify(state)}`

const searchStateToUrl = (props, searchState) =>
	searchState ? `${props.location.pathname}${createURL(searchState)}` : ""
const urlToSearchState = (location) => qs.parse(location.search.slice(1))

class HomePage extends Component {
	state = {
		noMoreItems: false,
		areFiltersOpen: this.props.currentBreakpoint > 1,
		searchState: urlToSearchState(this.props.location)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.location !== this.props.location) {
			this.setState({ searchState: urlToSearchState(this.props.location) })
		}
	}

	onSearchStateChange = (searchState) => {
		clearTimeout(this.debouncedSetState)
		this.debouncedSetState = setTimeout(() => {
			this.props.history.push(searchStateToUrl(this.props, searchState), searchState)
		}, updateAfter)
		this.setState({ searchState })
	}

	toggleFilters = () => {
		this.setState((state) => {
			const { areFiltersOpen } = state

			if (areFiltersOpen) {
				document.body.classList.remove("noScroll")
			} else {
				document.body.classList.add("noScroll")
			}
			return { areFiltersOpen: !areFiltersOpen }
		})
	}

	render() {
		const { areFiltersOpen, searchState } = this.state
		const { currentBreakpoint } = this.props

		const filterText =
			currentBreakpoint < 1 ? "Filtry" : areFiltersOpen ? "Ukryj filtry" : "Pokaż filtry"

		return (
			<InstantSearch
				appId={process.env.REACT_APP_APP_ID}
				apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
				indexName="dev_items"
				searchState={searchState}
				onSearchStateChange={this.onSearchStateChange}
				createURL={createURL}
			>
				<Configure hitsPerPage={getItemsPerPage()} />

				<Topbar>
					<TopbarInnerContainer>
						<FiltersToggle onClick={this.toggleFilters}>
							<FontAwesomeIcon icon="filter" />
							<span>{filterText}</span>
						</FiltersToggle>
						<SearchBox />
						<StyledPagination />
						<AlgoliaSortBy
							options={sortingOptions}
							defaultOption="dev_items_createdAt_desc"
						/>
					</TopbarInnerContainer>
				</Topbar>

				<Portal>
					<FullscreenFilters hidden={currentBreakpoint > 1 || !areFiltersOpen}>
						<FiltersHeader>
							<div className="buttons">
								<ClearRefinements />
							</div>
							<div className="closeButton" onClick={this.toggleFilters}>
								<FontAwesomeIcon icon="times" />
							</div>
						</FiltersHeader>
						<Filters />
					</FullscreenFilters>
				</Portal>

				<MainGrid>
					<Sidebar hidden={currentBreakpoint <= 1 || !areFiltersOpen}>
						<SidebarInner>
							<Filters />
						</SidebarInner>
					</Sidebar>

					<Content>
						{/* <AlgoliaInfiniteHits /> */}
						<AlgoliaHits />
					</Content>
				</MainGrid>
			</InstantSearch>
		)
	}
}

export default compose(
	withBreakpoints,
	withFirebase
)(HomePage)
