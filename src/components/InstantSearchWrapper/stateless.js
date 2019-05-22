import React from "react"
import { InstantSearch, Configure } from "react-instantsearch-dom"
import { VirtualToggle } from "../Algolia/Virtual"
import { Results, VirtualRefinement } from "../Algolia/Helpers"

const StatelessSearchWrapper = (props) => {
	console.log("props", props)
	const { indexName, refinements, limit, children, showArchived = false } = props
	const hideArchived = !showArchived

	return (
		<InstantSearch
			appId={process.env.REACT_APP_APP_ID}
			apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
			indexName={indexName}
		>
			{/* limit number of results */}
			{limit && <Configure hitsPerPage={limit} />}

			{/* apply necessary refinements */}
			{refinements &&
				Object.entries(refinements).map(([key, value]) => (
					<VirtualRefinement attribute={key} value={value} />
				))}

			{/* Hide archived results unless told otherwise */}
			{hideArchived && <VirtualToggle attribute="isArchived" defaultRefinement={false} />}

			{/* render children (also provide them with results) */}
			<Results>{children}</Results>
		</InstantSearch>
	)
}

export default StatelessSearchWrapper
