import React, { Component } from "react"
import cloneDeep from "clone-deep"

import InstantSearchWrapper from "../../components/InstantSearchWrapper"
import { CONST } from "../../constants"

import DEFAULT_SEARCH_STATE from "./defaultSearchState"

export class InstantSearchBlogWrapper extends Component {
	urlToState = (parsedSearch) => {
		let searchState = cloneDeep(DEFAULT_SEARCH_STATE)
		// format the searchState according to Algolia's spec
		const { tags, section, query, page } = parsedSearch

		searchState.refinementList.section = section || []
		searchState.refinementList.tags = tags || []
		searchState.query = query || ""
		searchState.page = page || 1

		return searchState
	}

	onSearchStateChange = async (newSearchState) => {
		// format the state to keep the url relatively short
		const { refinementList, query, page } = newSearchState
		let formattedState = {}
		if (refinementList !== undefined) {
			if (refinementList.tags !== undefined) formattedState.tags = refinementList.tags
			if (refinementList.section !== undefined)
				formattedState.section = refinementList.section
		}
		if (page !== undefined) formattedState.page = page
		if (query !== undefined) formattedState.query = query

		return formattedState
	}

	render() {
		return (
			<InstantSearchWrapper
				indexName={CONST.BLOG_ALGOLIA_INDEX}
				onSearchStateChange={this.onSearchStateChange}
				urlToState={this.urlToState}
				defaultSearchState={DEFAULT_SEARCH_STATE}
			>
				{this.props.children}
			</InstantSearchWrapper>
		)
	}
}

export default InstantSearchBlogWrapper
