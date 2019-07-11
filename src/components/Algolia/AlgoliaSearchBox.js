import React, { useState, useEffect, useRef } from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"
import { withBreakpoints } from "react-breakpoints"

import { Input } from "../FormElements"
import { decodeURL } from "../../utils/algoliaURLutils"
import { PoweredBy } from "./PoweredBy"

const AlgoliaSearchBox = ({
	location,
	refine,
	currentBreakpoint,
	placeholderLong,
	placeholder
}) => {
	const DELAY = 350

	const [value, setValue] = useState("")

	const inputRef = useRef()

	let rateLimitedRefine

	useEffect(() => {
		try {
			const parsedSearch = decodeURL(location.search)

			/* if there was a problem with parsing or query wasn't present 
			 default to empty string */
			const query = parsedSearch && parsedSearch.query ? parsedSearch.query : ""

			setValue(query)
		} catch (error) {
			setValue("")
			throw error
		}
	}, [location])

	const onChange = () => {
		// don't write the value to a variable, it is a ref and that is required

		setValue(inputRef.current.value)

		// the timeout makes it so the query only gets updated when you stop typing
		clearTimeout(rateLimitedRefine)
		rateLimitedRefine = setTimeout(() => {
			refine(inputRef.current.value)
		}, DELAY)
	}

	const onClear = () => {
		setValue("")
		refine()
	}

	const placeholderText =
		currentBreakpoint > 0 ? placeholderLong || placeholder : placeholder

	return (
		<Input
			icon="search"
			value={value}
			placeholder={placeholderText}
			onChange={onChange}
			ref={inputRef}
			rightSlot={<PoweredBy small />}
			rightSlotWidth="100px"
		/>
	)
}

export default compose(
	withRouter,
	connectSearchBox,
	withBreakpoints
)(AlgoliaSearchBox)
