import styled from "styled-components"
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
