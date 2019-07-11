import React from "react"
import styled from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { CONST } from "../../constants"

const ErrorContainer = styled.div`
	background: var(--danger100);
	color: var(--danger0);
	padding: var(--spacing2);
	border: 1px solid var(--danger0);
	margin-top: var(--spacing2);

	.icon {
		margin-left: var(--spacing1);
		margin-right: var(--spacing2);
	}
`

const translateFirebaseError = (error) => {
	let errorCode = typeof error === "object" ? error.code : null

	if (!errorCode) return null

	// compare the error against a list of known error codes
	switch (errorCode) {
		case "auth/account-exists-with-different-credential":
			return `Konto o tym adresie e-mail jest już zarejestrowane na tej stronie.
      Zaloguj się przy użyciu tego konta i powiąż swoje konta społecznościowe
      w ustawieniach profilu.`
		case "auth/email-already-in-use":
			return `Konto społecznościowe z tym adresem e-mail jest już zarejestrowane na tej stronie.
      Zaloguj się przy użyciu tego konta i powiąż swoje konta
			w ustawieniach profilu.`
		case "auth/network-request-failed":
			return "Wystąpił błąd połączenia"
		case "auth/requires-recent-login":
			return "Ta czynność wymaga ponownego zalogowania"
		case "auth/too-many-requests":
			return "Wystąpił błąd, spróbuj ponownie później"
		case "auth/user-disabled":
			return `To konto zostało zablokowane. Jeśli uważasz że to pomyłka, skontaktuj się z nami na: ${
				CONST.CONTACT_EMAIL
			}`
		case "auth/invalid-email":
			return "Podany adres e-mail jest niepoprawny"
		case "auth/user-not-found":
		case "auth/wrong-password":
			return "Podany e-mail lub hasło jest niepoprawne"
		case "auth/popup-closed-by-user":
			return "Okno logowania zostało zamknięte"
		case "auth/popup-blocked":
			return "Okno logowania zostało zablokowane przez przeglądarke. Wyłącz blokadę wyskakujących okien lub skorzystaj z logowania przez e-mail i hasło."
		case "auth/cancelled-popup-request":
			return "Okno logowania jest już otwarte"
		case "auth/user-token-expired":
			return `Sesja jest przedawniona lub użytkownik został usunięty. Spróbuj zalogować się ponownie.`
		default:
			return null
	}
}

const getMessage = (error) => {
	return typeof error === "string" ? error : error.message
}

function applyHandlers(error, handlers) {
	handlers = [...handlers]

	let finalErrorMessage = null
	let i = 0

	while (!finalErrorMessage) {
		finalErrorMessage = handlers[i](error)
		i++
	}

	return finalErrorMessage
}

const translateErrorMessage = (error) => {
	const message = applyHandlers(error, [translateFirebaseError, getMessage])

	return message
}

const FormError = ({ error }) => {
	const hasError = !!error

	if (!hasError) return null

	const message = translateErrorMessage(error)

	console.log(error)

	return (
		<ErrorContainer>
			<FontAwesomeIcon className="icon" icon="exclamation" />
			<span>{message}</span>
		</ErrorContainer>
	)
}

export default FormError
