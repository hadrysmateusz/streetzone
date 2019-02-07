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
						<Button
							onClick={() => {
								this.props.history.push(ROUTES.HOME)
								this.props.forceClear.update(true)
							}}
							fullWidth
						>
							Wyczyść filtry
						</Button>
					</ButtonContainer>
				) : (
					<ButtonsContainer>
						<Button onClick={this.props.toggleFilters}>Gotowe</Button>
						<Button
							onClick={() => {
								this.props.history.push(ROUTES.HOME)
								this.props.forceClear.update(true)
							}}
							fullWidth
						>
							Wyczyść filtry
						</Button>
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
