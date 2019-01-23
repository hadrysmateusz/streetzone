import styled from "styled-components"

export const Container = styled.div`
	display: grid;
	grid-auto-rows: minmax(240px, auto);

		grid-template-columns: 1fr 1fr;
	grid-gap: 3px;

	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
	grid-auto-rows: minmax(345px, auto);
	grid-gap: 10px;
	}
	/* @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		grid-template-columns: 1fr 1fr;
	} */
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		grid-template-columns: 1fr 1fr 1fr;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[5]}px) {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
`

export const MiniContainer = styled.div`
	display: grid;
	overflow: auto;
	grid-auto-rows: minmax(240px, auto);
	grid-template-columns: repeat(6, 45%);
	grid-gap: 4px;

	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		grid-gap: 10px;
		grid-template-columns: repeat(6, 30%);
	}
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: repeat(6, 23%);
	}
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		grid-template-columns: repeat(6, 22%);
	}
	@media (min-width: ${(p) => p.theme.breakpoints[4]}px) {
		grid-template-columns: 1fr 1fr 1fr;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[5]}px) {
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
	}
`

export const EndCard = styled.div`
	background: white;
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	display: flex;
	justify-content: center;
	align-items: center;
	text-transform: uppercase;
	font-size: 0.84rem;
	font-weight: 500;
	padding: 30px 0;
	box-shadow: 0 3px 6px -2px rgba(0, 0, 0, 0.12);
`
