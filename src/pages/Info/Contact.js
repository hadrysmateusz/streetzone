import React from "react"
import { CONST } from "../../constants"

const ContactPage = () => {
	return (
		<>
			<h2>Kontakt</h2>
			<p>Pytania? Propozycje?</p>
			<p>Pisz do nas na adres: {CONST.CONTACT_EMAIL}</p>
		</>
	)
}

export default ContactPage
