import styled from "styled-components"
import { resetButtonStyles } from "../Basics"

export const FilterMenu = styled.div`
	--width: 350px;

	width: var(--width);
	max-height: 75vh;
	padding: 20px;
	padding-bottom: 10px;

	position: absolute;
	top: 10px;
	right: calc(0px - (var(--width) + 10px));
	z-index: 995;

	background: white;
	box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.13);
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
`

export const FilterItemsContainer = styled.div`
	display: grid;
	margin-top: 10px;
	padding-bottom: 10px;
	grid-template-columns: 1fr 1fr;
	overflow: auto;
`

export const NoResults = styled.div`
	font-size: 0.76rem;

	text-align: center;
	margin: 6px 0;
`

export const OptionsContainer = styled.div`
	${(p) =>
		p.multiColumn &&
		`display: grid;
		grid-template-columns: repeat(3, 1fr);`}
`

export const FilterItem = styled.div`
	display: flex;
	align-items: center;

	font-size: 0.88rem;
	padding: 6px 6px;

	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		padding: 4px 6px;
		font-size: 0.84rem;
	}

	* {
		cursor: pointer;
	}

	span {
		padding-left: 6px;
	}

	label {
		color: ${(p) => p.theme.colors.black[75]};
		text-transform: uppercase;
		cursor: pointer;
		width: 100%;
	}
`

export const RangeContainer = styled.div`
	width: 100%;
	max-width: 100%;
	height: 34px;
	display: grid;
	gap: 10px;
	grid-template-columns: 1fr 1fr;
	input {
		border: 1px solid ${(p) => p.theme.colors.gray[75]};
		:hover {
			border: 1px solid ${(p) => p.theme.colors.gray[25]};
		}
		color: ${(p) => p.theme.colors.black[75]};
		padding: 0 10px;
		height: 100%;
		min-width: 0;
		min-height: 0;
		width: 100%;
	}
`

export const SearchBox = styled.div`
	width: 100%;
	height: 34px;
	grid-area: search;
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
		padding: 0 5px;
	}
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

export const ItemsLoaderContainer = styled.div`
	text-align: center;
`

export const ClearButton = styled.button`
	${resetButtonStyles}
	color: ${(p) => p.theme.colors.danger[50]};
	font-size: 0.78rem;
	padding: 3px 6px;
`

export const ResultsContainer = styled.main`
	grid-area: content;
	flex: 1;
	max-width: 1080px;
	margin: 0 auto;
`
