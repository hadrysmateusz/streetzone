import React from "react"

import { StatelessSearchWrapper } from "../../../components/InstantSearchWrapper"

import Group from "./Group"

export const DumbThematicGroup = ({
	results,
	title,
	linkTo,
	hasMore = true,
	component: C
}) => {
	console.log("RES", results)
	return results.length > 0 ? (
		<Group title={title} hasMore={hasMore} linkTo={linkTo}>
			{results.map((res) => (
				<C {...res} />
			))}
		</Group>
	) : null
}

export default ({
	limit = 3,
	index,
	title,
	refinements,
	linkTo,
	showArchived,
	hasMore,
	component
}) => {
	return (
		<StatelessSearchWrapper
			showArchived={showArchived}
			indexName={index}
			limit={limit}
			refinements={refinements}
		>
			{(results) => {
				return (
					<DumbThematicGroup
						results={results}
						title={title}
						linkTo={linkTo}
						hasMore={hasMore}
						component={component}
					/>
				)
			}}
		</StatelessSearchWrapper>
	)
}
