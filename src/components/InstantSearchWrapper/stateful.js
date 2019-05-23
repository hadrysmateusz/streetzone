import React, { useState, useEffect, useCallback } from "react"
import { withRouter } from "react-router-dom"
import { InstantSearch, Configure } from "react-instantsearch-dom"
import cloneDeep from "clone-deep"

import { decodeURL, encodeURL } from "../../utils/algoliaURLutils"
import { VirtualToggle } from "../Algolia/Virtual"

export const SearchWrapper = withRouter(
	({
		hitsPerPage,
		indexName,
		initialState,
		allowedKeys,
		children,
		history,
		location,
		showArchived = false,
		...rest
	}) => {
		const [searchState, setSearchState] = useState(initialState)
		const [isFirstRender, setIsFirstRender] = useState(true)

		const urlToState = (parsedSearch) => {
			let state = cloneDeep(initialState)

			const makeSureIsObject = (key) => {
				if (!state[key]) {
					state[key] = {}
				}
			}

			try {
				for (const [key, val] of Object.entries(parsedSearch)) {
					// these three always have the same names
					if (["sortBy", "query", "page"].includes(key)) {
						// TODO: only allow sorting by whitelisted keys
						state[key] = val
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
					if (typeof val === "object") {
						makeSureIsObject("range")
						state.range[key] = val
						continue
					}

					// any unhandled key should just be ignored
					// TODO: consider reporting unhandled keys to Sentry
				}

				// if all values are handled correctly return state object
				return state
			} catch (error) {
				// TODO: report to sentry
				console.error(error)

				// in case of error return default state
				return cloneDeep(initialState)
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
					if (val === initialState[key]) continue
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

		const createStateFromURL = useCallback(() => {
			try {
				const parsedSearch = decodeURL(location.search)
				const formattedState = urlToState(parsedSearch)
				return formattedState
			} catch (e) {
				console.log(e)
				// if there was a problem while parsing, use default state instead
				return initialState
			}
		}, [initialState, allowedKeys, location.search])

		return (
			<InstantSearch
				appId={process.env.REACT_APP_APP_ID}
				apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
				indexName={indexName}
				searchState={searchState}
				onSearchStateChange={handleSearchStateChange}
				createURL={decodeURL}
				{...rest}
			>
				{/* set number of results per page */}
				{hitsPerPage && <Configure hitsPerPage={hitsPerPage} />}

				{/* Hide archived results unless told otherwise */}
				{!showArchived && (
					<VirtualToggle attribute="isArchived" value={false} defaultRefinement={true} />
				)}

				{children}
			</InstantSearch>
		)
	}
)

export default SearchWrapper
