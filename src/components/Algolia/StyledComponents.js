import styled from "styled-components"
import { PoweredBy } from "react-instantsearch-dom"

import { resetButtonStyles } from "../../style-utils"

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

export const BoxItem = styled.div`
	border: 1px solid var(--gray75);
	font-size: var(--font-size--xs);
	height: 100%;
	transform: border 0.2s ease;
	:hover {
		border-color: var(--black25);
	}

	transition-property: border-color;
	transition-duration: 0.15s;
	transition-timing-function: ease;

	${(p) => p.checked && `color: white; background: black;`}
	label {
		cursor: pointer;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`

export const NoResults = styled.div`
	text-align: center;
	margin: 6px 0;
`

export const OptionsContainer = styled.div`
	display: grid;
	max-width: 100%;
	gap: var(--spacing1);
	${(p) => p.multiColumn && `grid-template-columns: repeat(2, 1fr);`}
	${(p) =>
		p.boxGrid &&
		"grid-template-columns: repeat(auto-fill, minmax(35px,1fr)); gap: var(--spacing2); "};
`

export const FilterItem = styled.div`
	display: flex;
	align-items: center;

	* {
		cursor: pointer;
	}

	span {
		padding-left: 6px;
	}

	label {
		color: ${(p) => p.theme.colors.black[75]};
		cursor: pointer;
		width: 100%;
	}
`

export const RangeContainer = styled.div`
	width: 100%;
	max-width: 100%;
	height: var(--form-element-height);
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
	height: var(--form-element-height);
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

	.powered-by-container {
		transform: scale(0.84);
		margin-top: 2px;
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
	font-size: var(--font-size--xs);
	margin: 0 var(--spacing1);
`

export const ResultsContainer = styled.main`
	grid-area: content;
	flex: 1;
	max-width: 1080px;
	margin: 0 auto;
`

export const StyledPoweredBy = styled(PoweredBy)`
	margin: 0;
	margin-top: 3px;
	height: 100%;
	transform: scale(0.88) translateX(10px);

	.ais-PoweredBy-text {
		display: none;
	}
	.ais-PoweredBy-logo {
		margin-bottom: -7px;
	}
`

export const SizeCategoriesContainer = styled.div`
	display: grid;
	gap: 5px;
	margin: 5px 0 5px 5px;
`
