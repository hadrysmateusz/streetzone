import styled from "styled-components/macro"
import { InstantSearch } from "react-instantsearch-dom"

export const StyledInstantSearch = styled(InstantSearch)`
	height: 100%;
	> {
		height: 100%;
	}
`

export const MainGrid = styled.div`
	position: relative;
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		display: grid;
		grid-template-columns: 270px 1fr;
		gap: var(--spacing3);
	}
`

export const Sidebar = styled.aside`
	align-self: flex-start;
	border: 1px solid var(--gray75);

	/* mobile */
	@media (max-width: ${(p) => p.theme.breakpoints[3] - 1}px) {
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

export const GridContainer = styled.div`
	display: grid;
	gap: var(--spacing3);
`
