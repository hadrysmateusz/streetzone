import theme from "../constants/theme"
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
