import React from "react"
import { InstantSearch, Configure } from "react-instantsearch-dom"
import { VirtualToggle } from "../Algolia/Virtual"
import { Results, VirtualRefinement } from "../Algolia/Helpers"

const StatelessSearchWrapper = (props) => {
	const { indexName, refinements, limit, children, showArchived = false } = props

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
					<VirtualRefinement key={key} attribute={key} value={value} />
				))}

			{/* Hide archived results unless told otherwise */}
			{!showArchived && (
				<VirtualToggle
					attribute="isArchived"
					value={false}
					defaultRefinement={true}
					label="Hide Archived Posts"
				/>
			)}

			{/* render children (also provide them with results) */}
			<Results>{children}</Results>
		</InstantSearch>
	)
}

export default StatelessSearchWrapper
