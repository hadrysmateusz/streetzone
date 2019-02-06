import styled, { css } from "styled-components"
import { SPIN } from "../../style-utils/keyframes"
import InstantSearch from "react-instantsearch-dom/dist/cjs/widgets/InstantSearch"

const BUTTONS_CONTAINER_HEIGHT = "85px"

export const StyledInstantSearch = styled(InstantSearch)`
	height: 100%;
	> {
		height: 100%;
	}
`

export const MainGrid = styled.div`
	position: relative;
	display: flex;
	margin: 10px auto;
	box-sizing: content-box;
	padding: 0 3px 10px;

	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		margin: 20px auto;
		padding: 0 20px;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[5]}px) {
		max-width: ${(p) => p.theme.breakpoints[5]}px;
	}
`

export const TopbarInnerContainer = styled.div`
	max-width: ${(p) => p.theme.breakpoints[5]}px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: max-content auto 1fr max-content;
	grid-template-areas: "filter refresh search sort";
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

export const Topbar = styled.div`
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
	grid-area: filter;
	padding: 0 14px;
	color: ${(p) => p.theme.colors.black[75]};
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 0;
	cursor: pointer;
	svg {
		margin-right: 5px;
	}

	padding: 0 12px;
	font-size: 0.92rem;
`

export const Content = styled.main`
	grid-area: content;
	flex: 1;
	max-width: 1080px;
	margin: 0 auto;
`

export const ButtonsContainer = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: min-content;
	gap: 10px;
	position: fixed;
	bottom: 0;
	left: 0;
	background: white;
	height: ${BUTTONS_CONTAINER_HEIGHT};
	padding: 20px;
	& > * {
		height: 100%;
		width: auto;
		height: auto;
		white-space: nowrap;
		min-width: 0;
	}
`

export const ButtonContainer = styled.div`
	margin-top: 10px;
	margin-bottom: 5px;
	width: 100%;
`

export const Sidebar = styled.aside`
	grid-area: filters;
	box-sizing: content-box;

	max-width: 100%;

	top: 44px;
	width: 220px;
	margin-right: 20px;
`

export const SidebarInner = styled.div`
	position: sticky;
	z-index: 89;
	top: 127px;
	background: white;
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	padding: 10px 20px;
`

export const FiltersContainer = styled.div`
	/* desktop */
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		position: relative;
	}

	/* mobile */
	@media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100vh;
		background: white;
		padding: 20px;
		padding-bottom: ${BUTTONS_CONTAINER_HEIGHT};
	}
`

export const FilterInnerContainer = styled.div`
	/* desktop */
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		max-height: calc(100vh - 300px);
		overflow-y: auto;
		margin-bottom: 5px;
	}

	> * {
		padding: 5px 0;
	}
`
