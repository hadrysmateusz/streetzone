import styled, { css } from "styled-components"

// utils

const fontWeight = css`
  ${(p) => p.bold && "font-weight: 700;"}
  ${(p) => p.light && "font-weight: 300;"}
  ${(p) => p.normal && "font-weight: 400;"}
`

const textBase = css`
	${fontWeight}
`

// headers

const headerBase = css`
	${textBase}
	font-family: "Playfair Display", serif;
`

export const Header1 = styled.h1`
	font-size: 8.5rem;
	font-weight: bold;
`

export const Header2 = styled.h2`
	${headerBase}
	font-size: 6.2rem;
	font-weight: bold;
`

export const Header3 = styled.h3`
	${headerBase}
	font-size: 3.8rem;
`

export const Header4 = styled.h4`
	${headerBase}
	font-size: 3rem;
`
