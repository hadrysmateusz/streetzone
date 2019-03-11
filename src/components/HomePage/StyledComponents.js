import styled from "styled-components"
import InstantSearch from "react-instantsearch-dom/dist/cjs/widgets/InstantSearch"

const BUTTONS_CONTAINER_HEIGHT = "85px"

export const StyledInstantSearch = styled(InstantSearch)`
	height: 100%;
	> {
		height: 100%;
	}
`

export const SearchContainer = styled.div``

export const MainGrid = styled.div`
	position: relative;
	display: flex;
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

	width: 290px;
	margin-right: 20px;

	/* mobile */
	@media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
		width: 0;
		margin: 0;
	}
`

export const FiltersContainer = styled.div`

	/* desktop */
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		position: relative;
	}

	/* mobile */
	@media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
		/* overflow: hidden; */
		width: 100%;
		max-width: 100vw;
		min-width: 0;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100vh;
		background: white;
		padding: 20px;
		/* padding-bottom: ${BUTTONS_CONTAINER_HEIGHT}; */
		display: flex;
		flex-flow: column nowrap;
	}
`

export const FilterInnerContainer = styled.div`
	/* desktop */
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		/* 70px(nav width) + 2*20px(margin top & bottom) = 110px */
		max-height: calc(100vh - 170px);
		overflow-y: auto;
	}

	> * {
		padding: 5px 0;
	}

	/* mobile */
	@media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
		flex: 1 1 100%;
		overflow-y: scroll;
		margin-bottom: 70px;
	}
`

export const ButtonsContainer = styled.div`
	min-width: 0;
	max-width: 100vw;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: min-content;
	gap: 10px;
	background: white;
	padding: 20px;
	padding-top: 10px;
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	left: 0;
	& > * {
		height: 100%;
		width: auto;
		height: auto;
		white-space: nowrap;
		min-width: 0;
	}
`

export const FiltersHeader = styled.div`
	padding: 6px 0;
	margin: 0 15px;
	background: white;
	font-size: 1.35rem;
	text-align: center;
	border-bottom: 1px solid var(--gray100);
`

export const CloseIconContainer = styled.span`
	cursor: pointer;
	position: fixed;
	padding: 20px;
	right: 15px;
	top: 15px;
	font-size: 0.89rem;
`

export const Section = styled.div`
	:not(:last-child) {
		border-bottom: 1px solid var(--gray100);
	}
	padding: 15px;
`
