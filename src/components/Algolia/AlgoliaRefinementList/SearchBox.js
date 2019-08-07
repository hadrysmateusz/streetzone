import React, { useState, useRef } from "react"
import { Input } from "../../FormElements"

const SearchBox = ({ search, debounce = 250 }) => {
	const [value, setValue] = useState("")
	const inputRef = useRef()
	const timeoutRef = useRef(null)

	const onChange = () => {
		// reset the timeout (debouncing)
		// don't write the value to a variable, the ref is required
		clearTimeout(timeoutRef.current)

		// update internal value
		setValue(inputRef.current.value)

		// set the timeout (debouncing)
		timeoutRef.current = setTimeout(() => {
			// trigger facet search
			search(inputRef.current.value)
			// remove the timeout (can be used to create a loading state indicator)
			timeoutRef.current = null
		}, debounce)
	}

	return (
		<Input
			icon="search"
			value={value}
			placeholder="Szukaj"
			onChange={onChange}
			ref={inputRef}
		/>
	)
}

export default SearchBox
