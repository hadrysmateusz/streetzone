import { connectHits } from "react-instantsearch-dom"
import React from "react"
import {
	VirtualRefinementList,
	VirtualRange,
	VirtualMenu,
	VirtualToggle
} from "../Algolia/Virtual"

/**
 * Provides the results from an algolia search using the render props pattern
 */
export const Results = connectHits(({ hits, children }) => {
	return children(hits)
})

/**
 * Returns correct virtual refinement based on provided value, providing a declarative API
 * @param {string} attribute - Attribute to refine
 * @param {string} value - The value to match
 */
export const VirtualRefinement = ({ attribute, value }) => {
	const cProps = { attribute, defaultRefinement: value }

	// all arrays correspond to a refinementList
	if (Array.isArray(value)) {
		return <VirtualRefinementList {...cProps} />
	}

	const type = typeof value

	switch (type) {
		case "object":
			return <VirtualRange {...cProps} />
		case "boolean":
			// this has to be done this way because of ToggleRefinement's weird api
			// value sets whether we're looking for true or false and defaultRefinement sets whether we want to apply this search or not)
			return (
				<VirtualToggle attribute={attribute} value={value} defaultRefinement={true} />
			)
		default:
			return <VirtualMenu {...cProps} />
	}
}
