import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

import { CONST, ROUTES } from "../../constants"

const OuterContainer = styled.div`
	display: flex;
	flex-flow: column nowrap;
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		flex-flow: row wrap;
	}
	align-items: center;
	align-content: center;
	justify-content: space-between;
	padding: 10px;
	border-top: 1px solid ${(p) => p.theme.colors.gray[75]};
	color: ${(p) => p.theme.colors.black[0]};
	background: white;
	font-size: 1.03rem;
	/* box-shadow: 0 -3px 5px -1px rgba(0, 0, 0, 0.05); */
`

const IconContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, auto);
	grid-template-rows: 100%;
	gap: 15px;
	& > * {
		&:hover {
			color: ${(p) => p.theme.colors.accent};
		}
	}
`

const Item = styled(Link)`
	white-space: nowrap;
	display: block;
	flex: 0 1;
	:not(${IconContainer}) {
		:hover {
			color: ${(p) => p.theme.colors.accent};
			cursor: pointer;
		}
	}
`

const InnerContainer = styled.div`
	display: flex;
	align-content: center;
	align-items: center;
	justify-content: center;

	flex-flow: row wrap;

	& > * {
		padding: 8px 15px;
	}
`

const Footer = () => {
	return (
		<OuterContainer>
			<InnerContainer>
				<Item to={ROUTES.TERMS}>Regulamin</Item>
				<Item to={ROUTES.PRIVACY_POLICY}>Polityka Prywatności</Item>
				<Item to={ROUTES.FAQ}>FAQ</Item>
				<Item to={ROUTES.ABOUT}>O nas</Item>
				<Item to={ROUTES.CONTACT}>Kontakt</Item>

				<IconContainer>
					<Item to={ROUTES.TWITTER_PROFILE}>
						<FontAwesomeIcon icon={["fab", "twitter"]} />
					</Item>
					<Item to={ROUTES.FACEBOOK_PROFILE}>
						<FontAwesomeIcon icon={["fab", "facebook-square"]} />
					</Item>
					<Item to={ROUTES.INSTAGRAM_PROFILE}>
						<FontAwesomeIcon icon={["fab", "instagram"]} />
					</Item>
				</IconContainer>
			</InnerContainer>

			<InnerContainer>
				<div>{CONST.BRAND_NAME} © 2019</div>
			</InnerContainer>
		</OuterContainer>
	)
}

export default Footer
