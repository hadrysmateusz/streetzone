import React from "react"
import { connectCurrentRefinements } from "react-instantsearch-core"
import styled from "styled-components/macro"
import { compose } from "recompose"
import { withRouter } from "react-router-dom"

import { itemDataHelpers, route } from "../../utils"

const { formatSize } = itemDataHelpers

const ClearFiltersButton = styled.div`
	color: ${(p) => p.theme.colors.danger[50]};
	:hover {
		text-decoration: underline;
	}
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 0 0 var(--width);
	margin-left: var(--spacing2);
`

const Container = styled.div`
	font-size: var(--font-size--xs);
	display: flex;
	flex-flow: row wrap;
	margin: calc(-1 * var(--spacing1));
`

const Item = styled.div`
	padding: var(--spacing2);
	background: white;
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	margin: var(--spacing1);
`

const CurrentFilters = ({ items, history, clearFilters, refine }) => {
	// ignore the isArchived refinement
	items = items.filter((a) => a.attribute !== "isArchived")

	return items && items.length > 0 ? (
		<Container>
			{items.map((item) => {
				if (item.attribute === "price") {
					return <Item>Cena</Item>
				} else if (item.attribute === "size") {
					return item.currentRefinement.map((refinement) => (
						<Item>{formatSize(refinement)}</Item>
					))
				} else {
					return item.currentRefinement.map((refinement) => <Item>{refinement}</Item>)
				}
			})}
			{items && items.length > 0 && (
				<ClearFiltersButton
					onClick={() => {
						history.replace(route("MARKETPLACE"))
						clearFilters()
					}}
				>
					Wyczyść wszystko
				</ClearFiltersButton>
			)}
		</Container>
	) : null
}

export default compose(
	connectCurrentRefinements,
	withRouter
)(CurrentFilters)
