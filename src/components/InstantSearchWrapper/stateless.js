import React from "react"
import { InstantSearch, Configure } from "react-instantsearch-dom"
import { VirtualSortBy } from "../Algolia/Virtual"
import { Results, VirtualRefinement } from "../Algolia/Helpers"

const StatelessSearchWrapper = ({ indexName, refinements, limit, sortBy, children }) => {
	console.log(refinements)
	return (
		<InstantSearch
			appId={process.env.REACT_APP_APP_ID}
			apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
			indexName={indexName}
		>
			{/* limit number of results */}
			{limit && <Configure hitsPerPage={limit} />}

			{/* order the results */}
			{sortBy && <VirtualSortBy defaultRefinement={sortBy} />}

			{/* apply necessary refinements */}
			{Object.entries(refinements).map(([key, value]) => (
				<VirtualRefinement attribute={key} value={value} />
			))}

			{/* render children (also provide them with results) */}
			<Results>{children}</Results>
		</InstantSearch>
	)
}

export default StatelessSearchWrapper
