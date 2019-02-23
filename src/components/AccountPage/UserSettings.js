import React from "react"
import AvatarChangeForm from "../AvatarChange"
import LoginManagement from "../LoginManagement"
import SignOutButton from "../SignOut"
import ProfileEdit from "./ProfileEditForm"
import { Header, UserSettingsContainer, Section } from "./StyledComponents"

const UserSettings = () => (
	<UserSettingsContainer>
		<Section>
			<Header>Podstawowe informacje</Header>
			<ProfileEdit
				onSubmit={(data) => {
					console.log(data)
				}}
				initialValues={{}}
			/>
		</Section>
		<Section>
			<Header>Zdjęcie profilowe</Header>
			<AvatarChangeForm />
		</Section>
		<Section>
			<Header>Metody logowania</Header>
			<LoginManagement />
		</Section>
		<Section>
			<SignOutButton />
		</Section>
	</UserSettingsContainer>
)

export default UserSettings
