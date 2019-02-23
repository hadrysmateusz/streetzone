import React, { Component } from "react"
import { withBreakpoints } from "react-breakpoints"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
	ButtonsContainer,
	FiltersContainer,
	FilterInnerContainer,
	FiltersHeader,
	CloseIconContainer
} from "./StyledComponents"
import AlgoliaRefinementList from "../Algolia/AlgoliaRefinementList"
import Button from "../Button"
import AlgoliaRange from "../Algolia/AlgoliaRange"
import { ROUTES } from "../../constants"

const TABS = {
	category: {
		displayName: "Kategoria",
		id: "category"
	},
	designers: {
		displayName: "Projektanci",
		id: "designers"
	},
	size: {
		displayName: "Rozmiar",
		id: "size"
	},
	price: {
		displayName: "Cena",
		id: "price"
	}
}

const ClearAllFiltersButton = ({ history, onClick }) => (
	<Button
		onClick={() => {
			history.push(ROUTES.HOME)
			onClick(true)
		}}
		fullWidth
	>
		Wyczyść filtry
	</Button>
)

export class Filters extends Component {
	state = { openTab: TABS.category }

	toggleTab = (tabId) => {
		this.setState({ openTab: TABS[tabId] })
	}

	render() {
		return (
			<FiltersContainer {...this.props}>
				{this.props.currentBreakpoint < 1 && (
					<FiltersHeader>
						<span>Filtry</span>
						<CloseIconContainer onClick={this.props.toggleFilters}>
							<FontAwesomeIcon icon="times" />
						</CloseIconContainer>
					</FiltersHeader>
				)}
				<FilterInnerContainer>
					<AlgoliaRefinementList
						tab={TABS.category}
						openTab={this.state.openTab}
						toggle={this.toggleTab}
						attribute="category"
					/>
					{/* showMore is required by algolia to display a full list */}
					<AlgoliaRefinementList
						tab={TABS.designers}
						openTab={this.state.openTab}
						toggle={this.toggleTab}
						attribute="designers"
						searchable
						show={8}
						showMore={true}
					/>
					<AlgoliaRefinementList
						attribute="size"
						multiColumn
						tab={TABS.size}
						openTab={this.state.openTab}
						toggle={this.toggleTab}
					/>

					<AlgoliaRange
						attribute="price"
						forceClear={this.props.forceClear}
						tab={TABS.price}
						openTab={this.state.openTab}
						toggle={this.toggleTab}
					/>
				</FilterInnerContainer>
				{this.props.currentBreakpoint < 1 && (
					<ButtonsContainer>
						<Button onClick={this.props.toggleFilters}>Gotowe</Button>
						<ClearAllFiltersButton
							history={this.props.history}
							onClick={this.props.forceClear.update}
						/>
					</ButtonsContainer>
				)}
			</FiltersContainer>
		)
	}
}

export default compose(
	withRouter,
	withBreakpoints
)(Filters)
