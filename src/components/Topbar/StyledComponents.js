import styled from "styled-components"
import { SPIN } from "../../style-utils/keyframes"

export const InnerContainer = styled.div`
	max-width: ${(p) => p.theme.breakpoints[5]}px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: max-content auto 1fr max-content;
	grid-template-areas: "filter refresh search poweredby sort";
	gap: 4px;
	> * {
		height: 42px;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		gap: 10px;
		> * {
			height: 34px;
		}
	}
	@media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
		grid-template-columns: none;
		grid-auto-columns: 1fr 1fr;
		grid-template-areas:
			"filter sort"
			"search search";
	}
`

export const OuterContainer = styled.div`
	border-top: 1px solid;
	border-bottom: 1px solid;
	border-color: ${(p) => p.theme.colors.gray[75]};
	position: sticky;
	z-index: 79;
	top: 46px;
	background: white;
	padding: 4px;
	margin: 10px 0;

	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		margin: 20px 0 0;
		padding: 13px 20px;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		top: 44px;
	}
`

export const RefreshButton = styled.div`
	@media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
		display: none;
	}
	width: 34px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${(p) => p.theme.colors.black[75]};
	background: white;
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	:hover {
		border: 1px solid ${(p) => p.theme.colors.gray[25]};
	}
	cursor: pointer;
	&.spin {
		svg {
			animation: 1.5s 1 ${SPIN};
		}
	}
`

export const FiltersToggle = styled.div`
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
	font-size: 0.92rem;
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
	display: flex;
	grid-area: filter;
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		min-width: 155px;
	}
`
