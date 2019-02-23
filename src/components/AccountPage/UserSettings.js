import React from "react"
import AvatarChangeForm from "../AvatarChange"
import LoginManagement from "../LoginManagement"
import SignOutButton from "../SignOut"
import ProfileEdit from "../ProfileEdit"
import { UserSettingsContainer, Section } from "./StyledComponents"
import { SubHeader } from "../Basics"

const UserSettings = () => (
	<UserSettingsContainer>
		<Section>
			<SubHeader>Podstawowe informacje</SubHeader>
			<ProfileEdit />
		</Section>
		<Section>
			<SubHeader>Zdjęcie profilowe</SubHeader>
			<AvatarChangeForm />
		</Section>
		<Section>
			<SubHeader>Metody logowania</SubHeader>
			<LoginManagement />
		</Section>
		<Section>
			<SignOutButton />
		</Section>
	</UserSettingsContainer>
)

export default UserSettings
