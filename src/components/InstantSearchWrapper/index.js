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

		const handleSearchStateChange = async (newSearchState) => {
			const formattedState = await onSearchStateChange(newSearchState)
			const url = encodeURL(formattedState)
			history.push(url)
		}

		const createStateFromURL = () => {
			try {
				const parsedSearch = decodeURL(location.search)
				const formattedState = urlToState(parsedSearch)
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
