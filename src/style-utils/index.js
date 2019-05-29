import theme from "../constants/theme"
import { POST_CATEGORIES as CATEGORIES } from "../constants"
import { css } from "styled-components/macro"

export const minWidth = theme.breakpoints.reduce((acc, val, i) => {
	acc[i] = (...args) => css`
		@media (min-width: ${val}px) {
			${css(...args)}
		}
	`
	return acc
}, {})

export const maxWidth = theme.breakpoints.reduce((acc, val, i) => {
	acc[i] = (...args) => css`
		@media (max-width: ${val - 1}px) {
			${css(...args)}
		}
	`
	return acc
}, {})

export const ellipsis = css`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`

export const resetButtonStyles = css`
	padding: 0;
	background: none;
	border: none;
	box-shadow: none;
	display: block;
	border-radius: 0;
	outline: none;
	cursor: pointer;
`

export const overlayCommon = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const overlayCommonStyles = css`
	background: rgba(0, 0, 0, 0.36);
	text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
	color: white;
`

export const overlayTextShadow = css`
	text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3), 0 2px 3px rgba(0, 0, 0, 0.5);
`

export const getCategoryColor = (category) => {
	switch (category) {
		case CATEGORIES.SNEAKERS:
			return "#df783d"
		case CATEGORIES.STREETWEAR:
			return "#0e974e"
		case CATEGORIES.REVIEW:
			return "#1b78b7"
		case CATEGORIES.EVENT:
			return "#b91f7c"
		case CATEGORIES.VIDEO:
			return "#cf2316"
		case CATEGORIES.TECH:
			return "#cce8ef"
		default:
			return "#c4c4c4"
	}
}

export const nLinesHigh = (nOfLines, lineHeight = "1.6em") => {
	return css`
		--line-height: ${lineHeight};
		--height: calc(${nOfLines} * var(--line-height));
		line-height: var(--line-height);
		height: var(--min-height);
	`
}
