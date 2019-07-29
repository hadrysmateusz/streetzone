import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { TextBlock } from "../../components/StyledComponents"
import HelmetBasics from "../../components/HelmetBasics"

import { CONST } from "../../constants"
import { route } from "../../utils"

const StyledLink = styled.a`
	color: var(--black100);
	margin-top: var(--spacing2);
	display: block;

	span {
		margin-left: 5px;
	}

	:hover {
		color: black;
	}
`

const BigButtonContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--spacing3);
	margin: var(--spacing4) 0;
`

const BigButton = styled.div`
	border: 2px solid var(--accent25);
	background: var(--accent50);
	color: white;
	text-shadow: 0 1px 3px rgba(0, 0, 0, 0.16);
	height: 68px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: var(--fs-l);
	font-weight: bold;
`

const ContactPage = () => {
	return (
		<>
			<HelmetBasics title="Kontakt" />

			<TextBlock size="m">
				Jeśli masz propozycje lub pytania na temat współpracy, albo znalazłeś problem na
				stronie, wybierz jedną z opcji poniżej.
			</TextBlock>

			<BigButtonContainer>
				{/* TODO: add working link */}
				<BigButton as={Link} to={""}>
					Współpraca
				</BigButton>
				<BigButton as={Link} to={route("BUG_REPORT")}>
					Zgłoś Problem
				</BigButton>
			</BigButtonContainer>

			<TextBlock size="m" bold>
				Jeśli masz inne pytania lub propozycje, napisz do nas:
			</TextBlock>
			<TextBlock size="s">
				<StyledLink href={`mailto:${CONST.CONTACT_EMAIL}`}>
					<FontAwesomeIcon icon={["far", "envelope"]} />{" "}
					<span>{CONST.CONTACT_EMAIL}</span>
				</StyledLink>
			</TextBlock>
			<TextBlock size="s">
				<StyledLink href={CONST.FACEBOOK_PROFILE}>
					<FontAwesomeIcon icon={["fab", "facebook-square"]} /> <span>Facebook</span>
				</StyledLink>
			</TextBlock>
		</>
	)
}

export default ContactPage
