import React from "react"
import { connectCurrentRefinements } from "react-instantsearch-core"
import styled from "styled-components"

const Container = styled.div`
	display: flex;
	flex-direction: column;
	max-width: ${(p) => p.theme.breakpoints[5]}px;
	margin: 0 auto;
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		flex-direction: row;
	}
`

const OuterContainer = styled.div`
	padding: 0 3px;
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		padding: 0 20px;
		padding-top: 20px;
	}
`

const Item = styled.div`
	padding: 5px 10px;
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

const CurrentFiltersView = connectCurrentRefinements(({ items }) => {
	return items && items.length > 0 ? (
		<OuterContainer>
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
								<strong>Rozmiar: </strong>{" "}
								<span>{item.currentRefinement.join(", ")}</span>
							</Item>
						)
					} else {
						return null
					}
				})}
			</Container>
		</OuterContainer>
	) : null
})

export default CurrentFiltersView
