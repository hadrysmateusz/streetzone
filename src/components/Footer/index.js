import React from "react"
import styled from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

import { ImportantText } from "../Basics"
import { TextBlock } from "../StyledComponents"

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
	color: white;
	background: var(--black0);

	${"" /* Stay above fixed elements like the blog header */}
	position: relative;
	z-index: 72;
`

const IconContainer = styled.div`
	display: flex;
	font-size: 2.7rem;
	* + * {
		margin-left: var(--spacing3);
	}
`

const Item = styled(Link)`
	white-space: nowrap;
	color: var(--gray100);
	${(p) => p.icon && "color: var(--black100);"}
	display: block;
	flex: 0 1;
	:not(${IconContainer}) {
		:hover {
			color: white;
			cursor: pointer;
		}
	}
`

const InnerContainer = styled.div`
	padding: var(--spacing3) 0;
	width: 100%;
	max-width: ${(p) => p.theme.breakpoints[5]}px;
	margin: 0 auto;
	display: grid;
	align-content: center;
	align-items: flex-start;
	justify-content: space-between;

	flex-flow: row wrap;

	& > * {
		padding: var(--spacing2) var(--spacing3);
	}

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: 2.5fr repeat(3, 1fr);
	}
`

const Group = styled.div`
	> :first-child {
		margin-bottom: var(--spacing3);
	}
	> * {
		margin: var(--spacing2) 0;
	}
`

const Footer = () => {
	return (
		<OuterContainer>
			<InnerContainer>
				<Group>
					<TextBlock size="l" bold>
						{CONST.BRAND_NAME}
					</TextBlock>
					<IconContainer>
						<Item icon to={ROUTES.TWITTER_PROFILE}>
							<FontAwesomeIcon icon={["fab", "twitter"]} />
						</Item>
						<Item icon to={ROUTES.FACEBOOK_PROFILE}>
							<FontAwesomeIcon icon={["fab", "facebook-square"]} />
						</Item>
						<Item icon to={ROUTES.INSTAGRAM_PROFILE}>
							<FontAwesomeIcon icon={["fab", "instagram"]} />
						</Item>
					</IconContainer>

					<Item>© 2019 {CONST.BRAND_NAME}</Item>
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
					<Item as="a" href={`mailto:${CONST.CONTACT_EMAIL}`}>
						{CONST.CONTACT_EMAIL}
					</Item>
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
