import React from "react"
import { CONST } from "../../constants"

const ContactPage = () => {
	return (
		<div>
			<h2>Kontakt</h2>
			<p>Pytania? Propozycje?</p>
			<p>Pisz do nas na adres: {CONST.CONTACT_EMAIL}</p>
		</div>
	)
}

export default ContactPage
