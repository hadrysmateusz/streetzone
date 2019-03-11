import React from "react"
import { connectCurrentRefinements } from "react-instantsearch-core"
import styled from "styled-components"
import { compose } from "recompose"
import { withRouter } from "react-router-dom"
import { ClearFiltersSubButton } from "../Topbar/StyledComponents"
import { ROUTES } from "../../constants"

const Container = styled.div`
	font-size: var(--font-size--s);
	display: flex;
	flex-direction: column;
	max-width: ${(p) => p.theme.breakpoints[5]}px;
	max-height: 40px;
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		flex-direction: row;
	}
`

const Item = styled.div`
	padding: 6px;
	background: white;
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	margin: 3px 0;

	/* desktop */
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		margin: 0;
		+ * {
			margin-left: 10px;
		}
	}
`

const CurrentFiltersView = ({ items, history, clearFilters }) => {
	return items && items.length > 0 ? (
		<Container>
			{items.map((item) => {
				if (item.attribute === "price") {
					return (
						<Item>
							<strong>Cena</strong>
						</Item>
					)
				} else if (item.attribute === "category") {
					return (
						<Item>
							<strong>Kategoria: </strong>{" "}
							<span>{item.currentRefinement.join(", ")}</span>
						</Item>
					)
				} else if (item.attribute === "designers") {
					return (
						<Item>
							<strong>Marka: </strong> <span>{item.currentRefinement.join(", ")}</span>
						</Item>
					)
				} else if (item.attribute === "size") {
					return (
						<Item>
							<strong>Rozmiar: </strong> <span>{item.currentRefinement.join(", ")}</span>
						</Item>
					)
				} else {
					return null
				}
			})}
			{items && items.length > 0 && (
				<ClearFiltersSubButton
					onClick={() => {
						history.push(ROUTES.HOME)
						clearFilters.update(true)
					}}
					title="Wyczyść filtry"
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
