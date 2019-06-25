import React, { createContext } from "react"
import { InstantSearch, Configure } from "react-instantsearch-dom"
import { VirtualToggle } from "../Algolia/Virtual"
import { Results, VirtualRefinement } from "../Algolia/Helpers"
import { useStateButton } from "../../hooks"

export const SearchWrapperContext = createContext()

const StatelessSearchWrapper = (props) => {
	const {
		indexName,
		refinements,
		filters,
		limit = 3,
		children,
		showArchived = false
	} = props

	const isRenderFn = typeof children === "function"

	const [shouldRefresh, refresh] = useStateButton(false)

	return (
		<InstantSearch
			appId={process.env.REACT_APP_APP_ID}
			apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
			indexName={indexName}
			refresh={shouldRefresh}
		>
			<Configure filters={filters || undefined} hitsPerPage={limit} />

			{/* apply necessary refinements */}
			{refinements &&
				Object.entries(refinements).map(([key, value]) => (
					<VirtualRefinement key={key} attribute={key} value={value} />
				))}

			{/* TODO: verify that this works */}
			{/* Hide archived results unless told otherwise */}
			{!showArchived && (
				<VirtualToggle
					attribute="isArchived"
					value={false}
					defaultRefinement={true}
					label="Hide Archived"
				/>
			)}

			{/* render children (using renderProps if applicable) */}
			<Results>
				{(results) => {
					return (
						<SearchWrapperContext.Provider value={{ results, refresh }}>
							{isRenderFn ? children(results) : children}
						</SearchWrapperContext.Provider>
					)
				}}
			</Results>
		</InstantSearch>
	)
}

export default StatelessSearchWrapper
