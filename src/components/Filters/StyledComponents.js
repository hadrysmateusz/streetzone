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
		max-height: 100vh;
		overflow-y: auto;
		padding-bottom: 100px; /* make sure no content is inaccessible */
	}
`

export const ActionsContainer = styled.div`
	min-width: 0;
	max-width: 100vw;
	width: 100%;

	background: white;
	padding: var(--spacing2);
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	left: 0;
`

export const FiltersHeader = styled.div`
	padding: var(--spacing2) 0;
	margin: 0 var(--spacing3);
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
	padding: var(--spacing2) 0;
	> :first-child {
		flex: 1;
	}
`
