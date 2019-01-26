import React from "react"
import { connectRefinementList } from "react-instantsearch-dom"
import { FilterItem } from "./StyledComponents"

const AlgoliaRefinementList = ({
	attribute,
	searchable,
	operator,
	showMore,
	limit,
	showMoreLimit,
	defaultRefinement,
	transformItems,
	refine,
	currentRefinement,
	items,
	searchForItems,
	canRefine,
	...rest
}) => {
	// Sort the array in place to prevent the items from moving on selection
	// items.sort((a, b) => {
	// 	if (b.count !== a.count) {
	// 		return b.count - a.count
	// 	} else {
	// 		var nameA = a.label.toUpperCase() // ignore upper and lowercase
	// 		var nameB = b.label.toUpperCase() // ignore upper and lowercase
	// 		if (nameA < nameB) {
	// 			return -1
	// 		}
	// 		if (nameA > nameB) {
	// 			return 1
	// 		}

	// 		// names must be equal
	// 		return 0
	// 	}
	// })
	// items.sort((a, b) => b.count - a.count)
	return (
		<div>
			{items.map((item) => {
				return (
					<FilterItem key={item.value}>
						<label htmlFor={`filter-value-${item.label}`}>
							<input
								id={`filter-value-${item.label}`}
								type="checkbox"
								checked={item.isRefined}
								value={item.value}
								name={item.label}
								onChange={(e) => refine(item.value)}
							/>
							<span>{item.label}</span>
						</label>
					</FilterItem>
				)
			})}
		</div>
	)
}

export default connectRefinementList(AlgoliaRefinementList)
