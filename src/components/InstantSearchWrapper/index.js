import React, { useState, useEffect } from "react"
// import equal from "deep-equal"
import { withRouter } from "react-router-dom"
import { InstantSearch } from "react-instantsearch-dom"
import { decodeURL, encodeURL } from "../../utils/algoliaURLutils"

export const UncontrolledInstantSearchWrapper = ({ indexName, children, ...rest }) => {
	return (
		<InstantSearch
			appId={process.env.REACT_APP_APP_ID}
			apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
			indexName={indexName}
			{...rest}
		>
			{children}
		</InstantSearch>
	)
}

export const InstantSearchWrapper = withRouter(
	({
		indexName,
		onSearchStateChange,
		urlToState,
		children,
		history,
		location,
		defaultSearchState,
		...rest
	}) => {
		const [searchState, setSearchState] = useState(defaultSearchState)
		const [shouldRefresh, setShouldRefresh] = useState(false)
		const [isFirstRender, setIsFirstRender] = useState(true)

		useEffect(() => {
			let state = createStateFromURL()
			if (isFirstRender) {
				state = { ...state, page: 1 }
				setIsFirstRender(false)
			}
			setSearchState(state)
		}, [location])

		// const refresh = () => {
		// 	setShouldRefresh(true)
		// 	setShouldRefresh(false)
		// }

		// const shouldScroll = (oldState, newState) => {
		// 	/* get copies of current and prev states and compare all values except for page
		// to determine whether the component should scroll back to the top */
		// 	const _oldState = { ...oldState, page: null }
		// 	const _newState = { ...newState, page: null }
		// 	const areEqual = equal(_newState, _oldState)
		// 	if (!areEqual) {
		// 		window.scrollTo(0, 0)
		// 	}
		// }

		const handleSearchStateChange = async (newSearchState) => {
			const formattedState = await onSearchStateChange(newSearchState)
			const url = encodeURL(formattedState)
			// debugger
			history.push(url)

			// update the searchState (to increase apparent performance)
			// setSearchState(newSearchState)
		}

		const createStateFromURL = () => {
			try {
				const parsedSearch = decodeURL(location.search)
				const formattedState = urlToState(parsedSearch)
				// debugger
				return formattedState
			} catch (e) {
				console.log(e)
				// if there was a problem while parsing, use default state instead
				return defaultSearchState
			}
		}

		return (
			<InstantSearch
				appId={process.env.REACT_APP_APP_ID}
				apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
				indexName={indexName}
				searchState={searchState}
				onSearchStateChange={handleSearchStateChange}
				createURL={decodeURL}
				refresh={shouldRefresh}
				{...rest}
			>
				{children}
			</InstantSearch>
		)
	}
)

export default InstantSearchWrapper
