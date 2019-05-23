import React from "react"

import { StatelessSearchWrapper } from "../../../components/InstantSearchWrapper"

import Group from "./Group"

export default ({
	limit = 3,
	index,
	title,
	refinements,
	linkTo,
	showArchived,
	component: C
}) => {
	return (
		<StatelessSearchWrapper
			showArchived={showArchived}
			indexName={index}
			limit={limit}
			refinements={refinements}
		>
			{(results) => {
				console.log(`group ${title} results: `, results)
				return results.length > 0 ? (
					<Group title={title} hasMore linkTo={linkTo}>
						{results.map((res) => (
							<C {...res} />
						))}
					</Group>
				) : null
			}}
		</StatelessSearchWrapper>
	)
}
