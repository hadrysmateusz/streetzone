import React from "react"
import { connectCurrentRefinements } from "react-instantsearch-core"
import styled from "styled-components/macro"
import { compose } from "recompose"
import { withRouter } from "react-router-dom"

import { ClearFiltersSubButton } from "../Topbar/StyledComponents"

import { ROUTES } from "../../constants"
import formatSize from "../../utils/formatSize"

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

const CurrentFiltersView = ({ items, history, clear, refine }) => {
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
				<ClearFiltersSubButton
					onClick={() => {
						history.push(ROUTES.MARKETPLACE)
						clear.update(true)
					}}
				>
					Wyczyść wszystko
				</ClearFiltersSubButton>
			)}
		</Container>
	) : null
}

export default compose(
	connectCurrentRefinements,
	withRouter
)(CurrentFiltersView)
