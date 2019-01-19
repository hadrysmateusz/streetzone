import React, { Component } from "react"
import {
	InstantSearch,
	SearchBox,
	ClearRefinements,
	RefinementList,
	RangeInput,
	Pagination,
	HitsPerPage,
	Configure
} from "react-instantsearch-dom"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"
import { Portal } from "react-portal"
import BlockUi from "react-block-ui"
import qs from "qs"
import shortid from "shortid"
import lzString from "lz-string"

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
import getItemsPerPage from "../../utils/getItemsPerPage"

console.log(lzString)

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

		return (
			<InstantSearch
				appId="ESTLFV2FMH"
				apiKey="a112a10276d1d2919b9207df6d9bbccf"
				indexName="dev_items"
				searchState={searchState}
				onSearchStateChange={this.onSearchStateChange}
				createURL={createURL}
			>
				<Configure hitsPerPage={4} />

				<Topbar>
					<TopbarInnerContainer>
						<FiltersToggle onClick={this.toggleFilters}>
							<FontAwesomeIcon icon="filter" />
							<span>Filtry</span>
						</FiltersToggle>
						<SearchBox />
						<StyledPagination />
						<AlgoliaSortBy
							options={sortingOptions}
							defaultOption="dev_items_createdAt_desc"
						/>
					</TopbarInnerContainer>
				</Topbar>

				{currentBreakpoint <= 1 && areFiltersOpen && (
					<Portal>
						<FullscreenFilters>
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
				)}
				<MainGrid>
					{areFiltersOpen && (
						<Sidebar>
							<SidebarInner>
								<Filters />
							</SidebarInner>
						</Sidebar>
					)}

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
