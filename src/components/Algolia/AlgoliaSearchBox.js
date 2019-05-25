import React, { useState, useEffect, useRef } from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"
import { withBreakpoints } from "react-breakpoints"

import { Input } from "../FormElements"
import { decodeURL } from "../../utils/algoliaURLutils"
import { PoweredBy } from "./PoweredBy"

const AlgoliaSearchBox = ({
	location,
	history,
	refine,
	currentRefinement,
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

	const placeholderText = currentBreakpoint > 0 ? placeholderLong : placeholder

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

// class AlgoliaSearchBox extends React.Component {
// 	delay = 350

// 	state = { inputValue: this.props.currentRefinement }

// 	componentDidMount() {
// 		try {
// 			// get the encoded search parameter from URL
// 			const parsedSearch = decodeURL(this.props.location.search)

// 			this.setState({ inputValue: parsedSearch.query })
// 		} catch (e) {
// 			// if there was a problem while parsing, empty the field
// 			this.setState({ inputValue: "" })
// 		}
// 	}

// 	onChange = (e) => {
// 		// get the currentTarget from the synthetic event before its inaccessible
// 		const currentTarget = e.currentTarget
// 		// update the internal state
// 		this.setState({ inputValue: currentTarget.value })

// 		// the timeout makes it so the query only gets updated when you stop typing
// 		clearTimeout(this.rateLimitedRefine)
// 		this.rateLimitedRefine = setTimeout(() => {
// 			this.props.refine(currentTarget.value)
// 		}, this.delay)
// 	}

// 	clearField = () => {
// 		this.setState({ inputValue: "" })

// 		this.props.refine()
// 	}

// 	componentDidUpdate(prevProps) {
// 		if (prevProps.location !== this.props.location) {
// 			try {
// 				// get the encoded search parameter from URL
// 				var searchParams = new URLSearchParams(this.props.location.search)
// 				const search = searchParams.get("search")

// 				// decode and parse the search paramter
// 				const parsedSearch = JSON.parse(search)

// 				this.setState({ inputValue: parsedSearch.query })
// 			} catch (e) {
// 				// if there was a problem while parsing, empty the field
// 				this.setState({ inputValue: "" })
// 			}
// 		}
// 	}

// 	render() {
// 		const placeholderText =
// 			this.props.currentBreakpoint > 0 ? "Szukaj po nazwie, marce, itd." : "Szukaj"

// 		return (
// 			<Input
// 				icon="search"
// 				value={this.state.inputValue}
// 				placeholder={placeholderText}
// 				onChange={this.onChange}
// 			/>

// 			// {/* <SearchBox>
// 			// 	<div className="icon-container">
// 			// 		<FontAwesomeIcon icon="search" />
// 			// 	</div>
// 			// 	<input
// 			// 		type="text"
// 			// 		onChange={this.onChange}
// 			// 		value={this.state.inputValue}
// 			// 		placeholder={placeholderText}
// 			// 	/>
// 			// 	{this.state.inputValue && (
// 			// 		<div className="icon-container" onClick={this.clearField}>
// 			// 			<FontAwesomeIcon icon="times" />
// 			// 		</div>
// 			// 	)}
// 			// 	<div className="powered-by-container">
// 			// 		<StyledPoweredBy />
// 			// 	</div>
// 			// </SearchBox> */}
// 		)
// 	}
// }

export default compose(
	withRouter,
	connectSearchBox,
	withBreakpoints
)(AlgoliaSearchBox)
