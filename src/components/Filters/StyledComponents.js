import styled from "styled-components/macro"

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
	}
`

export const FilterInnerContainer = styled.div`
	/* mobile */
	@media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
		flex: 1 1 100%;
		overflow-y: scroll;
		margin-bottom: 70px;
	}
`

export const ActionsContainer = styled.div`
	min-width: 0;
	max-width: 100vw;
	width: 100%;

	background: white;
	padding: 10px;
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	left: 0;
`

export const FiltersHeader = styled.div`
	padding: 6px 0;
	margin: 0 15px;
	background: white;
	text-align: center;
	border-bottom: 1px solid var(--gray100);
`

export const Section = styled.div`
	:not(:last-child) {
		border-bottom: 1px solid var(--gray75);
	}
`

export const ListItem = styled.div`
	display: flex;
	padding: 6px 0;
	> :first-child {
		flex: 1;
	}
`

export const CloseIconContainer = styled.span`
	cursor: pointer;
	padding: var(--spacing1);
`

export const MobileFiltersHeader = styled.header`
	border-bottom: 1px solid var(--gray75);
	padding: var(--spacing3);
	display: grid;
	grid-template-columns: 1fr min-content;
	grid-auto-flow: column;
	align-items: center;
`
