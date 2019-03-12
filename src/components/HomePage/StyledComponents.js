import styled from "styled-components"
import InstantSearch from "react-instantsearch-dom/dist/cjs/widgets/InstantSearch"
import { PageContainer } from "../Containers"

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
	grid-area: filters;
	box-sizing: content-box;

	max-width: 100%;

	width: 280px;
	margin-right: 20px;

	/* mobile */
	@media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
		width: 0;
		margin: 0;
	}
`

export const GridContainer = styled(PageContainer)`
	display: grid;
	gap: 20px;
`
