import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"

import { CONST, ROUTES } from "../../constants"

const LogoContainer = styled.div`
	display: flex;
	align-items: center;
	height: 100%;

	font-size: var(--font-size--m);
	font-weight: bold;

	flex: 1;
	user-select: none;
	position: relative;
	white-space: nowrap;
	img {
		width: 100px;
		transition: transform 200ms ease;
		:hover {
			transform: rotate(-2deg);
		}
	}

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		font-size: var(--font-size--l);
		img {
			width: 120px;
		}
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
				<img src={PATH} alt={`Logo ${CONST.BRAND_NAME}`} />
			</LogoContainer>
		</Link>
	)
}

export default Logo
