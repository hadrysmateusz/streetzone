import React from "react"

import { StatelessSearchWrapper } from "../InstantSearchWrapper"

import Group from "./Group"

export const DumbThematicGroup = ({
	results,
	title,
	linkTo,
	hasMore = true,
	component: C
}) => {
	return results.length > 0 ? (
		<Group title={title} hasMore={hasMore} linkTo={linkTo}>
			{results.map((res) => (
				<C {...res} key={res.id} />
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
