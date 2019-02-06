import React, { Component } from "react"

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
import { withBreakpoints } from "react-breakpoints"

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
						<AlgoliaRange attribute="price" />
					</Foldable>
				</FilterInnerContainer>
				{this.props.currentBreakpoint > 0 ? (
					<ButtonContainer>
						<AlgoliaClearRefinements />
					</ButtonContainer>
				) : (
					<ButtonsContainer>
						<Button onClick={this.props.toggleFilters}>Gotowe</Button>
						<AlgoliaClearRefinements />
					</ButtonsContainer>
				)}
			</FiltersContainer>
		)
	}
}

export default withBreakpoints(Filters)
