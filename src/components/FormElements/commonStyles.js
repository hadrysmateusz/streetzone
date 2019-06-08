import { css } from "styled-components/macro"

export const disabledStyles = css`
	background: var(--almost-white);
	border-color: var(--gray50);
`

export const hoverStyles = css`
	border-color: var(--black75);
`

export const focusStyles = css`
	border-color: var(--black75);
	outline: none;
	box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
`

export const placeholderStyles = css`
	color: var(--gray0);
`

export const basicStyles = css`
	border: 1px solid;
	width: 100%;
	border-color: ${(p) => (!!p.hasError ? "var(--danger50)" : "var(--gray25)")};
	transition: box-shadow 0.11s ease, border-color 0.11s ease;
`

export default css`
	${basicStyles}

	::placeholder {
		${placeholderStyles}
	}

	&[disabled] {
		${disabledStyles}
	}

	&:not([disabled]) {
		:hover {
			${hoverStyles}
		}
		:focus {
			${focusStyles}
		}
	}
`
