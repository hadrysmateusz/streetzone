import React from "react"
import { connectCurrentRefinements } from "react-instantsearch-dom"
import Button from "../Button"

const AlgoliaClearRefinements = ({ refine, items, query, ...rest }) => {
	return (
		<Button onClick={() => items.forEach((item) => refine(item.value))}>
			Wyczyść filtry
		</Button>
	)
}

export default connectCurrentRefinements(AlgoliaClearRefinements)
