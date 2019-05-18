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

const PATH = process.env.PUBLIC_URL + "/img/StreetZoneLogo.png"

const Logo = ({ centered }) => {
	return (
		<Link to={ROUTES.HOME}>
			<LogoContainer centered={centered}>
				<img src={PATH} alt={`Logo ${CONST.BRAND_NAME}`} width={130} />
			</LogoContainer>
		</Link>
	)
}

export default Logo
