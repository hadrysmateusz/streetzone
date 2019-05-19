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
			return <VirtualToggle {...cProps} />
		default:
			return <VirtualMenu {...cProps} />
	}
}
