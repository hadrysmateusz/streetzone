import React, { useState, useEffect, useMemo } from "react"
// import equal from "deep-equal"
import { withRouter } from "react-router-dom"
import { InstantSearch } from "react-instantsearch-dom"
import { decodeURL, encodeURL } from "../../utils/algoliaURLutils"
import cloneDeep from "clone-deep"

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
		defaultSearchState,
		allowedKeys,
		children,
		history,
		location,
		...rest
	}) => {
		const [searchState, setSearchState] = useState(defaultSearchState)
		const [shouldRefresh, setShouldRefresh] = useState(false)
		const [isFirstRender, setIsFirstRender] = useState(true)

		const urlToState = (parsedSearch) => {
			let state = cloneDeep(defaultSearchState)

			const makeSureIsObject = (key) => {
				if (!state[key]) {
					state[key] = {}
				}
			}

			try {
				for (const [key, val] of Object.entries(parsedSearch)) {
					// these three always have the same names
					if (key === "sortBy") {
						// TODO: only allow sorting by whitelisted keys
						state.sortBy = val
						continue
					}
					if (key === "query") {
						state.query = val
						continue
					}
					if (key === "page") {
						state.page = val
						continue
					}

					// apart from sortBy, query and page all keys must be whitelisted
					if (!allowedKeys.includes(key)) {
						console.log("key:", key)
						console.log("value:", val)
						throw new Error(`Tried to query a forbidden key, more info in the console`)
					}

					// all arrays correspond to a refinementList
					if (Array.isArray(val)) {
						makeSureIsObject("refinementList")
						state.refinementList[key] = val
						continue
					}

					// all objects correspond to range fields
					// has to be after array as arrays are also objects
					/* TODO: original implementation involved deleting state.range if no value was present
          make sure this won't cause issues */
					if (typeof val === "object") {
						makeSureIsObject("range")
						state.range[key] = val
						continue
					}

					// getting here means an unhandled key - throw an error
					throw new Error(`Unhandled key ${key}`)
				}

				// if all values are handled correctly return state object
				return state
			} catch (error) {
				// TODO: report to sentry
				console.error(error)

				// in case of error return default state
				return cloneDeep(defaultSearchState)
			}
		}

		const onSearchStateChange = (state) => {
			let formattedState = {}

			const flatten = (outerKey) => {
				for (const [key, val] of Object.entries(state[outerKey])) {
					formattedState[key] = val
				}
			}

			for (const [key, val] of Object.entries(state)) {
				if (["sortBy", "page", "query"].includes(key)) {
					// if new value is equal to default one, don't clutter the url with it
					if (val === defaultSearchState[key]) continue
					formattedState[key] = val
					continue
				}

				if (["refinementList", "range"].includes(key)) {
					flatten(key)
				}
			}

			return formattedState
		}

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

		const createStateFromURL = useMemo(() => {
			try {
				const parsedSearch = decodeURL(location.search)
				const formattedState = urlToState(parsedSearch)
				return formattedState
			} catch (e) {
				console.log(e)
				// if there was a problem while parsing, use default state instead
				return defaultSearchState
			}
		}, [defaultSearchState, allowedKeys, location.search])

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
