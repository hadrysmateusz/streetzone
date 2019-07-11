import React from "react"
import { Index, Configure } from "react-instantsearch-dom"

import { TextBlock } from "../StyledComponents"
import { DumbThematicGroup } from "../ThematicGroup"
import { Results } from "./Helpers"

const IndexResults = ({ indexName, children, title, component, limit }) => {
	const isCustomRender = !!children
	const isRenderFunction = typeof children === "function"

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
								isRenderFunction ? (
									children(results)
								) : (
									children
								)
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
