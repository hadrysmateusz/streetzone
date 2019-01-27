import styled, { css } from "styled-components"

export const SearchBox = styled.div`
	flex: 1;
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	:hover {
		border: 1px solid ${(p) => p.theme.colors.gray[25]};
	}
	display: flex;
	color: ${(p) => p.theme.colors.black[75]};

	.icon-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 34px;
	}

	input {
		border: none;
		flex: 1;
		background: white;
		min-width: 0;
		width: 100%;
	}
`

export const FilterItem = styled.div`
	padding: 3px 6px;
	display: flex;
	align-items: center;

	* {
		cursor: pointer;
	}

	input {
	}

	span {
		padding-left: 6px;
	}

	label {
		color: ${(p) => p.theme.colors.black[75]};
		text-transform: uppercase;
		/* padding: 0 4px 0 8px; */
		font-size: 0.84rem;
		cursor: pointer;
		width: 100%;
	}

	/* display: grid;
		grid-template-columns: repeat(2, 1fr); */
`

export const MiniContainer = styled.div`
	display: grid;
	overflow: auto;
	grid-auto-rows: auto;
	grid-template-columns: repeat(6, 46%);
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
