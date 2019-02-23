import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

const Section = styled.section`
	margin-bottom: 60px;
	max-width: 600px;

	h2 {
		font-weight: 500;
	}
`

const Container = styled.div`
	padding-left: 10px;
`

const UserInfo = ({ user }) => {
	return (
		<Container>
			<Section>
				<h2>Dodatkowe Informacje</h2>
				<p>{user.info}</p>
			</Section>
			<Section>
				<h2>Kontakt</h2>
				{user.email && (
					<p>
						<FontAwesomeIcon icon="envelope" />
						E-mail: <strong>{user.email}</strong>
					</p>
				)}
				{user.phone && (
					<p>
						<FontAwesomeIcon icon="phone" />
						E-mail: <strong>{user.phone}</strong>
					</p>
				)}
				{user.facebookProfile && (
					<p>
						<FontAwesomeIcon icon={["fab", "facebook-square"]} />
						Facebook: <strong>{user.facebookProfile}</strong>
					</p>
				)}
			</Section>
		</Container>
	)
}

export default UserInfo
