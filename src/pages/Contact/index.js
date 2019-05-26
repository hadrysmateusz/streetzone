import React from "react"
import { CONST } from "../../constants"
import { PageContainer } from "../../components/Containers"

const ContactPage = () => {
	return (
		<PageContainer>
			<h2>Kontakt</h2>
			<p>Pytania? Propozycje?</p>
			<p>Pisz do nas na adres: {CONST.CONTACT_EMAIL}</p>
		</PageContainer>
	)
}

export default ContactPage
