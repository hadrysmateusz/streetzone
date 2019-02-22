import theme from "../constants/theme"
import { css } from "styled-components"

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
