import styled from "styled-components"

export const Container = styled.div`
	display: grid;
	gap: 4px;
	grid-auto-columns: 1fr 1fr;
	grid-template-areas:
		"search search"
		"filter sort";

	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		grid-template-columns: 1fr 180px;
		grid-template-areas: "search sort";
		gap: 10px;
		.filter-container {
			display: none;
		}
	}

	.search-container {
		grid-area: search;
		height: 100%;
	}
	.sort-container {
		grid-area: sort;
		height: 100%;
	}
	.filter-container {
		grid-area: filter;
		width: 100%;
		height: 100%;
	}
`

export const Toggle = styled.div`
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	:hover {
		border: 1px solid ${(p) => p.theme.colors.gray[25]};
	}
	background: white;
	padding: 0 12px;
	color: ${(p) => p.theme.colors.black[75]};
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 0;
	cursor: pointer;
	flex: 1;

	svg {
		margin-right: 5px;
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
`

export const FiltersToggleContainer = styled.div`
	height: var(--form-element-height);
	display: flex;
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		min-width: 155px;
	}
`
