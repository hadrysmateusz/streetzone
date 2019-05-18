import React, { useState } from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"

import { CONST, ROUTES } from "../../constants"

const LogoContainer = styled.div`
	font-size: var(--font-size--l);
	font-weight: bold;
	font-family: "Playfair Display";

	flex: 1;
	user-select: none;
	position: relative;
	white-space: nowrap;

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		font-size: var(--font-size--xl);
	}

	color: ${(p) => p.theme.colors.black[75]};
	${(p) =>
		p.centered &&
		`display: flex;
		align-items: center;
		justify-content: center;`}
`

const options = [
	{
		path: process.env.PUBLIC_URL + "/img/logo/slice3.png",
		width: 130
	},
	{
		path: process.env.PUBLIC_URL + "/img/logo/slice4.png",
		width: 130
	},
	{
		path: process.env.PUBLIC_URL + "/img/logo/slice5.png",
		width: 130
	},
	{
		path: process.env.PUBLIC_URL + "/img/logo/slice6.png",
		width: 130
	},
	{
		path: process.env.PUBLIC_URL + "/img/logo/slice7.png",
		width: 130
	}
]

const Logo = ({ centered }) => {
	const [index, setIndex] = useState(0)

	const onClick = (e) => {
		e.stopPropagation()
		e.preventDefault()
		setIndex((index) => (index + 1) % options.length)
	}

	const { path, width } = options[index]

	return (
		<Link to={ROUTES.HOME} onClick={onClick}>
			<LogoContainer centered={centered}>
				<img src={path} alt={`Logo ${CONST.BRAND_NAME}`} width={width} />
			</LogoContainer>
		</Link>
	)
}

export default Logo
