import React from "react"
import { Index, Configure } from "react-instantsearch-dom"

import { TextBlock } from "../StyledComponents"
import { DumbThematicGroup } from "../ThematicGroup"
import { Results } from "./Helpers"

const IndexResults = ({ indexName, render, title, component, limit }) => {
	const isCustomRender = !!render

	return (
		<Index indexName={indexName}>
			{!!limit && <Configure hitsPerPage={limit} />}

			<Results>
				{(results) =>
					!results || results.length === 0 ? null : (
						<>
							<TextBlock size="xl" bold>
								{title}
							</TextBlock>
							{isCustomRender ? (
								render
							) : (
								<DumbThematicGroup
									results={results}
									hasMore={false}
									component={component}
								/>
							)}
						</>
					)
				}
			</Results>
		</Index>
	)
}

export default IndexResults
