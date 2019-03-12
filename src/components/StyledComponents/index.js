import styled, { css } from "styled-components"

// utils

const fontWeight = css`
  ${(p) => p.bold && "font-weight: 700;"}
  ${(p) => p.light && "font-weight: 300;"}
  ${(p) => p.normal && "font-weight: 400;"}
`

const textBase = css`
	${fontWeight}
	color: var(--black25);
	${(p) => p.uppercase && "text-transform: uppercase"}
`

// headers

const headerBase = css`
	${textBase}
	margin: 0;
	letter-spacing: 0.02em;
	font-family: "Playfair Display", serif;
`

export const Header1 = styled.h1`
	${headerBase}
	font-size: var(--font-size--h1);
	font-weight: 700;
`

export const Header2 = styled.h2`
	${headerBase}
	font-size: var(--font-size--h2);
	font-weight: 700;
`

export const Header3 = styled.h3`
	${headerBase}
	font-size: var(--font-size--h3);
`

export const Header4 = styled.h4`
	${headerBase}
	font-size: var(--font-size--h4);
`

// text

const bodyTextBase = css`
	${textBase}
	margin: 0;
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
				return "var(--font-size--m)"
		}
	}};
`

export const TextBlock = styled.p`
	${bodyTextBase}
`

export const Text = styled.span`
	${bodyTextBase}
`
