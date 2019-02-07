import React, { Component } from "react"
import { withBreakpoints } from "react-breakpoints"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"

import Foldable from "../Foldable"
import {
	ButtonsContainer,
	FiltersContainer,
	FilterInnerContainer,
	ButtonContainer
} from "./StyledComponents"
import AlgoliaRefinementList from "../Algolia/AlgoliaRefinementList"
import Button from "../Button"
import AlgoliaClearRefinements from "../Algolia/AlgoliaClearRefinements"
import AlgoliaRange from "../Algolia/AlgoliaRange"
import { ROUTES } from "../../constants"

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
	render() {
		return (
			<FiltersContainer {...this.props}>
				<FilterInnerContainer>
					<Foldable title="Kategoria" onlyVisual>
						<AlgoliaRefinementList attribute="category" />
					</Foldable>
					<Foldable title="Projektanci" onlyVisual>
						{/* showMore is required by algolia to display a full list */}
						<AlgoliaRefinementList
							attribute="designers"
							searchable
							show={8}
							showMore={true}
						/>
					</Foldable>
					<Foldable title="Rozmiar" onlyVisual>
						<AlgoliaRefinementList attribute="size" multiColumn />
					</Foldable>
					<Foldable title="Cena" onlyVisual>
						<AlgoliaRange attribute="price" forceClear={this.props.forceClear} />
					</Foldable>
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
