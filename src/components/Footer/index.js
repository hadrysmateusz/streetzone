import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

import { CONST, CSS, ROUTES } from "../../constants"

const OuterContainer = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	border-top: 1px solid rgb(221, 221, 221);
	background: white;
	color: #292929;
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
			color: ${CSS.COLOR_ACCENT};
		}
	}
`

const Item = styled(Link)`
	white-space: nowrap;
	display: block;
	flex: 0 1;
	:not(${IconContainer}) {
		:hover {
			color: ${CSS.COLOR_ACCENT};
			cursor: pointer;
		}
	}
`

const InnerContainer = styled.div`
	display: flex;
	flex-flow: row wrap;

	& > * {
		padding: 8px 15px;
	}
`

const Footer = () => {
	return (
		<OuterContainer>
			<InnerContainer>
				<Item to={ROUTES.FAQ}>FAQ</Item>
				<Item to={ROUTES.PRIVACY_POLICY}>Polityka Prywatności</Item>
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
