import styled, { css } from "styled-components/macro"

// utils

const fontWeight = css`
  ${(p) => p.bold && "font-weight: 700;"}
  ${(p) => p.light && "font-weight: 300;"}
  ${(p) => p.normal && "font-weight: 400;"}
`

const textBase = css`
	${fontWeight}
	${(p) => p.uppercase && "text-transform: uppercase;"}
`

// text

const bodyTextBase = css`
	${textBase}
	${(p) => p.serif && "font-family: var(--font-family--serif);"}
	${(p) => p.color && `color: var(--${p.color});`}
	${(p) => p.italic && `font-style: italic;`}
	font-size: ${(p) => {
		switch (p.size) {
			case "xs":
				return "var(--font-size--xs);"
			case "s":
				return "var(--font-size--s);"
			case "m":
				return "var(--font-size--m);"
			case "l":
				return "var(--font-size--l);"
			case "xl":
				return "var(--font-size--xl);"
			case "xxl":
				return "var(--font-size--xxl);"
			default:
				return p.size
		}
	}};
`

export const TextBlock = styled.div`
	${bodyTextBase}

	${(p) => p.centered && "text-align: center;"}
`

export const Text = styled.span`
	${bodyTextBase}
`

export const SmallText = styled(Text).attrs({
	color: "gray0",
	size: "xs",
	uppercase: "true"
})``
export const SmallTextBlock = styled(TextBlock).attrs({
	color: "gray0",
	size: "xs",
	uppercase: "true"
})``

// containers

export const HorizontalContainer = styled.div`
	display: flex;
	${(p) => p.justifyContent && `justify-content: ${p.justifyContent};`}
	${(p) =>
		p.gap &&
		`> * + * {
			padding-left: var(--spacing${p.gap});
		}
	`}
`
