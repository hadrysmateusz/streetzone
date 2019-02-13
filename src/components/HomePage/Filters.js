import React, { Component } from "react"
import { withBreakpoints } from "react-breakpoints"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"

import { AdaptiveFoldable } from "../Foldable"
import {
	ButtonsContainer,
	FiltersContainer,
	FilterInnerContainer,
	ButtonContainer,
	FiltersHeader
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
				{this.props.currentBreakpoint == 0 && <FiltersHeader>Filtry</FiltersHeader>}
				<FilterInnerContainer>
					<AdaptiveFoldable
						tab={TABS.category}
						openTab={this.state.openTab}
						toggle={this.toggleTab}
					>
						<AlgoliaRefinementList attribute="category" />
					</AdaptiveFoldable>
					<AdaptiveFoldable
						tab={TABS.designers}
						openTab={this.state.openTab}
						toggle={this.toggleTab}
					>
						{/* showMore is required by algolia to display a full list */}
						<AlgoliaRefinementList
							attribute="designers"
							searchable
							show={8}
							showMore={true}
						/>
					</AdaptiveFoldable>
					<AdaptiveFoldable
						tab={TABS.size}
						openTab={this.state.openTab}
						toggle={this.toggleTab}
					>
						<AlgoliaRefinementList attribute="size" multiColumn />
					</AdaptiveFoldable>
					<AdaptiveFoldable
						tab={TABS.price}
						openTab={this.state.openTab}
						toggle={this.toggleTab}
					>
						<AlgoliaRange attribute="price" forceClear={this.props.forceClear} />
					</AdaptiveFoldable>
				</FilterInnerContainer>
				{this.props.currentBreakpoint > 0 ? (
					<ButtonContainer>
						<ClearAllFiltersButton
							history={this.props.history}
							onClick={this.props.forceClear.update}
						/>
					</ButtonContainer>
				) : (
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
