import React, { useState, useEffect, useCallback } from "react"
import { withRouter } from "react-router-dom"
import { InstantSearch, Configure } from "react-instantsearch-dom"
import cloneDeep from "clone-deep"

import { decodeURL, encodeURL } from "../../utils/algoliaURLutils"
import { VirtualToggle } from "../Algolia/Virtual"
import { VirtualRefinement } from "../Algolia/Helpers"

const EMPTY_SEARCH_ERR = "empty search string"

/**
 * @param indexName select index to query, selecting a replica index allows to change sorting
 * @param allowedKeys attributes to which refinements can be applied - prevents querying arbitrary values by modifying the url
 * @param hitsPerPage number of results to show on a given page
 * @param initialState override any part of the initial state
 * @param showArchived whether to show results marked as archived - hidden by default
 * @param ignoreArchivedStatus set to true if the given index doesn't support the isArchived attribute
 */
export const SearchWrapper = withRouter(
	({
		indexName,
		hitsPerPage = 12,
		initialState,
		allowedKeys,
		children,
		history,
		location,
		showArchived = false,
		ignoreArchivedStatus = false,
		refinements,
		...rest
	}) => {
		// use default values and prop overrides to construct initial state
		const [_initialState] = useState({
			query: "",
			page: 1,
			refinementList: {},
			...initialState
		})
		const [searchState, setSearchState] = useState(_initialState)
		const [isFirstRender, setIsFirstRender] = useState(true)

		const urlToState = useCallback(
			(parsedSearch) => {
				let state = cloneDeep(_initialState)

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
					return cloneDeep(_initialState)
				}
			},
			[_initialState, allowedKeys]
		)

		const createStateFromURL = useCallback(() => {
			try {
				const parsedSearch = decodeURL(location.search)
				if (!parsedSearch) throw new Error("empty search string")
				const formattedState = urlToState(parsedSearch)
				return formattedState
			} catch (e) {
				// EMPTY_SEARCH_ERR is harmless, don't report it
				if (e.message !== EMPTY_SEARCH_ERR) {
					console.log(e)
				}
				// if there was a problem while parsing, use default state instead
				return _initialState
			}
		}, [_initialState, location.search, urlToState])

		const onSearchStateChange = (state) => {
			let formattedState = {}

			const flatten = (outerKey) => {
				for (const [key, val] of Object.entries(state[outerKey])) {
					formattedState[key] = val
				}
			}

			for (const [key, val] of Object.entries(state)) {
				if (["sortBy", "page", "query"].includes(key)) {
					// this makes it harder to debug
					// if new value is equal to default one, don't clutter the url with it
					// if (val === _initialState[key]) continue
					formattedState[key] = val
					continue
				}

				if (["refinementList", "range"].includes(key)) {
					flatten(key)
				}
			}

			return formattedState
		}

		const handleSearchStateChange = useCallback(
			async (newSearchState) => {
				const formattedState = await onSearchStateChange(newSearchState)
				const url = encodeURL(formattedState)
				history.replace(url)
			},
			[history]
		)

		useEffect(() => {
			let state = createStateFromURL()
			if (isFirstRender) {
				setIsFirstRender(false)
				if (state.page !== 1) {
					const newState = { ...state, page: 1 }
					handleSearchStateChange(newState)
				}
			}
			setSearchState(state)
		}, [location, createStateFromURL, isFirstRender, handleSearchStateChange])

		const forceRefineWithState = async (partialSearchState) => {
			const newSearchState = {
				...searchState,
				...partialSearchState
			}
			const formattedState = await onSearchStateChange(newSearchState)
			const url = encodeURL(formattedState)
			console.log("forced", formattedState)
			history.replace(url)
		}

		const isChildrenFunction = typeof children === "function"

		return (
			<InstantSearch
				appId={process.env.REACT_APP_APP_ID}
				apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
				indexName={indexName}
				searchState={searchState}
				onSearchStateChange={handleSearchStateChange}
				createURL={encodeURL}
				{...rest}
			>
				{hitsPerPage && <Configure hitsPerPage={hitsPerPage} />}

				{/* apply necessary refinements */}
				{refinements &&
					Object.entries(refinements).map(([key, value]) => (
						<VirtualRefinement key={key} attribute={key} value={value} />
					))}

				{/* Hide archived results unless told otherwise */}
				{!ignoreArchivedStatus && !showArchived && (
					<VirtualToggle
						attribute="isArchived"
						value={false}
						defaultRefinement={true}
						label="Hide archived"
					/>
				)}

				{isChildrenFunction ? children(forceRefineWithState) : children}
			</InstantSearch>
		)
	}
)

export default SearchWrapper
