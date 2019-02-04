import React, { Component } from "react"

import Foldable from "../Foldable"
import { ButtonsContainer, FiltersContainer } from "./StyledComponents"
import AlgoliaRefinementList from "../Algolia/AlgoliaRefinementList"
import Button from "../Button"
import AlgoliaClearRefinements from "../Algolia/AlgoliaClearRefinements"
import AlgoliaRange from "../Algolia/AlgoliaRange"

export class Filters extends Component {
	render() {
		return (
			<FiltersContainer {...this.props}>
				<Foldable title="Kategoria">
					<AlgoliaRefinementList attribute="category" />
				</Foldable>
				<Foldable title="Projektanci">
					<AlgoliaRefinementList attribute="designers" searchable />
				</Foldable>
				<Foldable title="Rozmiar" startFolded>
					<AlgoliaRefinementList attribute="size" multiColumn />
				</Foldable>
				<Foldable title="Cena" startFolded>
					<AlgoliaRange attribute="price" />
				</Foldable>
				<ButtonsContainer>
					<Button onClick={this.props.toggleFilters}>Gotowe</Button>
					<AlgoliaClearRefinements />
				</ButtonsContainer>
			</FiltersContainer>
		)
	}
}

export default Filters
