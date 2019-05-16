import React from "react"
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

const Logo = ({ centered }) => (
	<LogoContainer centered={centered}>
		<Link to={ROUTES.HOME}>{CONST.BRAND_NAME}</Link>
	</LogoContainer>
)

export default Logo
