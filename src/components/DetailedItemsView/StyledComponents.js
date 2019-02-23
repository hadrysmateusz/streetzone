import styled from "styled-components"

export const ItemsContainer = styled.div`
	display: grid;
	grid-gap: 3px;
	width: 100%;
	margin: 0 auto;

	grid-auto-rows: min-content;

	@media (max-width: ${(p) => p.theme.breakpoints[3] - 1}px) {
		max-width: 500px;
	}

	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		grid-gap: 10px;
	}

	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		grid-template-columns: repeat(2, 1fr);
	}
`
