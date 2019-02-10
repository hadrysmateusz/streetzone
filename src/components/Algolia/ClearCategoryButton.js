import React from "react"
import { connectCurrentRefinements } from "react-instantsearch-dom"

import { ClearButton } from "./StyledComponents"

const Clear = connectCurrentRefinements(({ items, refine, attribute }) => {
	return (
		<ClearButton
			onClick={() => {
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
				onClick={() => {
					const itemToClear = items.find((item) => item.attribute === attribute)
					if (itemToClear) {
						refine(itemToClear.value)
						resetState()
					}
				}}
			>
				Wyczyść
			</ClearButton>
		)
	}
)

export default Clear
