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

export const Toggle = styled.div`
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	:hover {
		border: 1px solid ${(p) => p.theme.colors.gray[25]};
	}
	background: white;
	padding: 0 var(--spacing3);
	color: ${(p) => p.theme.colors.black[75]};
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 0;
	cursor: pointer;
	flex: 1;

	svg {
		margin-right: var(--spacing2);
	}
`

export const ClearFiltersSubButton = styled.div`
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

export const FiltersToggleContainer = styled.div`
	height: var(--form-element-height);
	display: flex;
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		min-width: 155px;
	}
`
