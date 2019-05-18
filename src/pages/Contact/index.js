import React from "react"
import { CONST } from "../../constants"
import { PageContainer, MainPageContainer } from "../../components/Containers"

const ContactPage = () => {
	return (
		<MainPageContainer>
			<PageContainer>
				<h2>Kontakt</h2>
				<p>Pytania? Propozycje?</p>
				<p>Pisz do nas na adres: {CONST.CONTACT_EMAIL}</p>
			</PageContainer>
		</MainPageContainer>
	)
}

export default ContactPage
