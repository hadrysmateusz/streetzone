import React from "react"
import styled from "styled-components"
import ProfilePicture from "../ProfilePicture"

const MainInfoContainer = styled.div`
	grid-area: info;
	display: grid;
	grid-template-columns: 120px 1fr;
	grid-template-rows: 120px;
	background: white;
	padding: 20px;
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
`

const MainInfo = ({ user }) => (
	<MainInfoContainer>
		<ProfilePicture url={user.profilePictureURL} />
		<div>
			<h2>Imię: {user.name}</h2>
			<p>Email: {user.email}</p>
		</div>
	</MainInfoContainer>
)

export default MainInfo
