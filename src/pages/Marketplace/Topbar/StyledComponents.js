import styled from "styled-components/macro"

export const Container = styled.div`
	display: grid;
	gap: var(--spacing1);
	grid-template-columns: 1fr 1fr;

	/* mobile-only */
	@media (max-width: ${(p) => p.theme.breakpoints[3] - 1}px) {
		.search-container {
			grid-column: span 2;
		}
	}

	/* > mobile */
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		grid-template-columns: 1fr 180px;
		gap: var(--spacing2);
		.filters-toggle-container {
			display: none;
		}
	}
`
