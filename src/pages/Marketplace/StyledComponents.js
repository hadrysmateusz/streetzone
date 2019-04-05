import styled from "styled-components/macro"
import { InstantSearch } from "react-instantsearch-dom"

import { PageContainer } from "../../components/Containers"

export const StyledInstantSearch = styled(InstantSearch)`
	height: 100%;
	> {
		height: 100%;
	}
`

export const MainGrid = styled.div`
	position: relative;
	display: flex;
`

export const Sidebar = styled.aside`
	align-self: flex-start;
	border: 1px solid var(--gray75);
	grid-area: filters;
	box-sizing: content-box;

	max-width: 100%;

	width: 270px;
	margin-right: 20px;

	/* mobile */
	@media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
		width: 0;
		margin: 0;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 9999;
	}
`

export const GridContainer = styled(PageContainer)`
	display: grid;
	gap: 20px;
`
