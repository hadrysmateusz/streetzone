import React, { Component, useState, useEffect } from "react"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks
} from "body-scroll-lock"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { withFirebase } from "../../components/Firebase"
import AlgoliaResults from "../../components/Algolia/AlgoliaResults"
import CurrentFilters from "../../components/CurrentFilters"
import sortingOptions from "../../constants/sortingOptions"
import ScrollToTop from "../../components/ScrollToTop"
import Filters from "../../components/Filters"
import Topbar from "../../components/Topbar"
import InstantSearchWrapper from "../../components/InstantSearchWrapper/new"
import { PageContainer, MainPageContainer } from "../../components/Containers"

import PromotedSection from "./PromotedSection"
import Header from "./Header"
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

	const toggleFilters = () => {
		setAreFiltersOpen((state) => !state)
	}

	return (
		<InstantSearchWrapper
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
							clearFilters={{
								value: clearFilters,
								update: setClearFilters
							}}
						/>

						<MainGrid>
							<Sidebar hidden={!areFiltersOpen && !(currentBreakpoint > 0)}>
								<Filters
									toggleFilters={toggleFilters}
									clearFilters={{
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
		</InstantSearchWrapper>
	)
}

export default withBreakpoints(MarketplacePage)

// class HomePage extends Component {
// 	state = {
// 		areFiltersOpen: this.props.currentBreakpoint > 1,
// 		clearFilters: false,
// 		viewMode: "list"
// 	}

// 	targetElement = null

// 	setClearFiltersFlag = (to) => this.setState({ clearFilters: to })

// 	componentDidMount() {
// 		this.targetElement = document.querySelector("#filters-container")
// 	}

// 	toggleFilters = () => {
// 		const wasOpen = this.state.areFiltersOpen
// 		if (wasOpen) {
// 			enableBodyScroll(this.targetElement)
// 		} else {
// 			disableBodyScroll(this.targetElement)
// 		}

// 		this.setState((state) => {
// 			const { areFiltersOpen } = state
// 			return { areFiltersOpen: !areFiltersOpen }
// 		})
// 	}

// 	setView = (viewMode) => {
// 		return this.setState({ viewMode })
// 	}

// 	componentWillUnmount() {
// 		clearAllBodyScrollLocks()
// 	}

// 	render() {
// 		const { areFiltersOpen } = this.state
// 		const { currentBreakpoint } = this.props

// 		if (currentBreakpoint > 0) {
// 			enableBodyScroll(this.targetElement)
// 		}

// 		return (
// 			<InstantSearchWrapper
// 				indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
// 				initialState={DEFAULT_SEARCH_STATE}
// 				allowedKeys={["category", "designers", "price", "size"]}
// 			>
// 				<MainPageContainer>
// 					<Header />
// 					<PromotedSection />
// 					<PageContainer extraWide>
// 						<GridContainer>
// 							<Topbar
// 								areFiltersOpen={areFiltersOpen}
// 								toggleFilters={this.toggleFilters}
// 								clearFilters={this.setClearFiltersFlag}
// 								setView={this.setView}
// 								searchQueryValue={this.state.query}
// 							/>

// 							<CurrentFilters
// 								clearFilters={{
// 									value: this.state.clearFilters,
// 									update: this.setClearFiltersFlag
// 								}}
// 							/>

// 							<MainGrid>
// 								<Sidebar hidden={!areFiltersOpen && !(currentBreakpoint > 0)}>
// 									<Filters
// 										toggleFilters={this.toggleFilters}
// 										clearFilters={{
// 											value: this.state.clearFilters,
// 											update: this.setClearFiltersFlag
// 										}}
// 									/>
// 								</Sidebar>
// 								<AlgoliaResults viewMode={this.state.viewMode} />
// 							</MainGrid>
// 						</GridContainer>
// 					</PageContainer>
// 					<ScrollToTop>
// 						<FontAwesomeIcon icon="long-arrow-alt-up" />
// 					</ScrollToTop>
// 				</MainPageContainer>
// 			</InstantSearchWrapper>
// 		)
// 	}
// }

// export default compose(
// 	withBreakpoints,
// 	withFirebase
// )(HomePage)
