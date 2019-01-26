import React, { Component } from "react"
import { RangeInput } from "react-instantsearch-dom"

import Foldable from "../Foldable"
import { StyledRefinementList, SizeRefinementList } from "./StyledComponents"
import AlgoliaRefinementList from "../Algolia/AlgoliaRefinementList"

export class Filters extends Component {
	render() {
		return (
			<div {...this.props}>
				<Foldable title="Kategoria">
					<AlgoliaRefinementList attribute="category" />
				</Foldable>
				<Foldable title="Projektanci">
					<AlgoliaRefinementList attribute="designers" searchable />
				</Foldable>
				<Foldable title="Rozmiar" startFolded>
					<SizeRefinementList attribute="size" />
				</Foldable>
				<Foldable title="Cena" startFolded>
					<RangeInput attribute="price" min={0} />
				</Foldable>
			</div>
		)
	}
}

export default Filters
