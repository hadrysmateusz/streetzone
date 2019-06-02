import styled from "styled-components/macro"

import { resetButtonStyles, ellipsis } from "../../style-utils"

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
	margin: var(--spacing2) 0;
`

export const OptionsContainer = styled.div`
	display: grid;
	max-width: 100%;
	gap: var(--spacing1);
	${(p) => p.multiColumn && `grid-template-columns: repeat(2, 1fr);`}
	${(p) =>
		p.boxGrid &&
		"grid-template-columns: repeat(auto-fill, minmax(35px,1fr)); gap: var(--spacing2); margin: var(--spacing2) 0;"};
`

export const FilterItem = styled.div`
	display: flex;
	align-items: center;
	min-width: 0;

	* {
		cursor: pointer;
	}

	span {
		padding-left: var(--spacing2);
	}

	label {
		color: ${(p) => p.theme.colors.black[75]};
		cursor: pointer;
		width: 100%;
		${ellipsis}
	}
`

export const RangeContainer = styled.div`
	width: 100%;
	max-width: 100%;
	height: var(--form-element-height);
	display: grid;
	gap: var(--spacing2);
	grid-template-columns: 1fr 1fr;
	input {
		border: 1px solid ${(p) => p.theme.colors.gray[75]};
		:hover {
			border: 1px solid ${(p) => p.theme.colors.gray[25]};
		}
		color: ${(p) => p.theme.colors.black[75]};
		padding: 0 var(--spacing2);
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

	input {
		border: none;
		flex: 1;
		background: white;
		min-width: 0;
		width: 100%;
		padding: 0 var(--spacing1);
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

export const SizeCategoriesContainer = styled.div`
	display: grid;
	gap: var(--spacing1);
	margin: var(--spacing1) 0 var(--spacing1) var(--spacing1);
`

export const InfiniteOwnerCardsContainer = styled.div`
	display: grid;
	gap: var(--spacing2);
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		gap: var(--spacing3);
	}
`
