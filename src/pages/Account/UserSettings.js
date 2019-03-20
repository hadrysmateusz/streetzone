import React from "react"

import AvatarChangeForm from "../../components/AvatarChange"
import LoginManagement from "../../components/LoginManagement"
import SignOutButton from "../../components/SignOut"
import ProfileEdit from "../../components/ProfileEdit"
import { SubHeader } from "../../components/Basics"

import { UserSettingsContainer, Section } from "./StyledComponents"

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
