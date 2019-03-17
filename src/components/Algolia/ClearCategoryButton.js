import React from "react"
import { connectCurrentRefinements } from "react-instantsearch-dom"

import { ClearButton } from "./StyledComponents"

const Clear = connectCurrentRefinements(({ items, refine, attribute }) => {
	return (
		<ClearButton
			onClick={(e) => {
				e.stopPropagation()
				const itemToClear = items.find((item) => item.attribute === attribute)
				refine(itemToClear.value)
			}}
		>
			Wyczyść
		</ClearButton>
	)
})

export const ClearRange = connectCurrentRefinements(
	({ items, refine, attribute, resetState }) => {
		return (
			<ClearButton
				onClick={(e) => {
					e.stopPropagation()
					const itemToClear = items.find((item) => item.attribute === attribute)
					if (itemToClear) {
						refine(itemToClear.value)
					}
					// resetting state happens separately to clear the value even if it is invalid
					resetState()
				}}
			>
				Wyczyść
			</ClearButton>
		)
	}
)

export default Clear
