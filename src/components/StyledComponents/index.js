import styled, { css } from "styled-components"

// utils

const fontWeight = css`
  ${(p) => p.bold && "font-weight: 700;"}
  ${(p) => p.light && "font-weight: 300;"}
  ${(p) => p.normal && "font-weight: 400;"}
`

const textBase = css`
	margin: 0;
	${fontWeight}
	${(p) => p.uppercase && "text-transform: uppercase"}
`

// text

const bodyTextBase = css`
	${textBase}
	font-size: ${(p) => {
		switch (p.size) {
			case "xs":
				return "var(--font-size--xs)"
			case "s":
				return "var(--font-size--s)"
			case "m":
				return "var(--font-size--m)"
			case "l":
				return "var(--font-size--l)"
			default:
				return "var(--font-size--s)"
		}
	}};
`

export const TextBlock = styled.p`
	${bodyTextBase}
`

export const Text = styled.span`
	${bodyTextBase}
`
