import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

import { CONST, ROUTES } from "../../constants"
import { ImportantText } from "../Basics"

const OuterContainer = styled.div`
	display: flex;
	flex-flow: column nowrap;
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		flex-flow: row wrap;
	}
	align-items: center;
	align-content: center;
	justify-content: space-between;
	border-top: 1px solid ${(p) => p.theme.colors.gray[75]};
	color: ${(p) => p.theme.colors.black[0]};
	background: white;
	font-size: 1.03rem;
`

const IconContainer = styled.div`
	display: flex;
	* + * {
		margin-left: 10px;
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
	padding: 20px 0;
	width: 100%;
	max-width: ${(p) => p.theme.breakpoints[5]}px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 2.5fr repeat(3, 1fr);
	grid-auto-flow: column;
	align-content: center;
	align-items: flex-start;
	justify-content: space-between;

	flex-flow: row wrap;

	& > * {
		padding: 8px 15px;
	}

	font-size: 0.86rem;
`

const Logo = styled.span`
	font-size: 2.3rem;
	font-weight: bold;
`

const Group = styled.div`
	> :first-child {
		margin-bottom: 20px;
	}
	> * {
		margin: 10px 0;
	}
`

const Footer = () => {
	return (
		<OuterContainer>
			<InnerContainer>
				<Group>
					<Logo>Bumped</Logo>
					<div>© 2019 {CONST.BRAND_NAME}</div>
				</Group>
				<Group>
					<ImportantText>INFORMACJE</ImportantText>
					<Item to={ROUTES.ABOUT}>O nas</Item>
					<Item to={ROUTES.TERMS}>Regulamin</Item>
					<Item to={ROUTES.PRIVACY_POLICY}>Polityka Prywatności</Item>
				</Group>
				<Group>
					<ImportantText>KONTAKT</ImportantText>
					<Item to={ROUTES.CONTACT}>Kontakt</Item>
					<div>{CONST.CONTACT_EMAIL}</div>
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
				</Group>
				<Group>
					<ImportantText>POMOC</ImportantText>
					<Item to={ROUTES.FAQ}>FAQ</Item>
					<Item to={ROUTES.BUG_REPORT}>Zgłoś problem</Item>
				</Group>
			</InnerContainer>
		</OuterContainer>
	)
}

export default Footer
