import React from "react"
import styled from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ErrorContainer = styled.div`
	background: var(--error100);
	color: var(--error0);
	padding: var(--spacing2);
	border: 1px solid var(--error0);

	.icon {
		margin-left: var(--spacing1);
		margin-right: var(--spacing2);
	}
`

const translateErrorMessage = (error) => {
	// get the error message
	let message = typeof error === "string" ? error : error.message
	let errorCode = typeof error === "object" ? error.code : null

	// compare the error against a list of known error codes
	switch (errorCode) {
		case "auth/account-exists-with-different-credential":
			return `Konto o tym samym adresie e-mail jest już zarejestrowane na tej stronie.
      Zaloguj się przy użyciu tego konta i powiąż swoje konta społecznościowe
      w ustawieniach profilu.`
		case "auth/email-already-in-use":
			return `Konto społecznościowe z tym adresem e-mail jest już zarejestrowane na tej stronie.
      Zaloguj się przy użyciu tego konta i powiąż swoje konta
      w ustawieniach profilu.`
		default:
			return message
	}
}

const FormError = ({ error }) => {
	const hasError = !!error

	if (!hasError) return null

	const message = translateErrorMessage(error)

	return (
		<ErrorContainer>
			<FontAwesomeIcon className="icon" icon="exclamation" />
			<span>{message}</span>
		</ErrorContainer>
	)
}

export default FormError
