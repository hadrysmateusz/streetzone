import React from "react"

import AvatarChangeForm from "../../components/AvatarChange"
import LoginManagement from "../../components/LoginManagement"
import SignOutButton from "../../components/SignOut"
import ProfileEdit from "../../components/ProfileEdit"
import { TextBlock } from "../../components/StyledComponents"

import { UserSettingsContainer, Section } from "./StyledComponents"

const UserSettings = () => (
	<UserSettingsContainer>
		<Section>
			<TextBlock size="m" bold uppercase>
				Podstawowe informacje
			</TextBlock>
			<ProfileEdit />
		</Section>

		<Section>
			<TextBlock size="m" bold uppercase>
				Zdjęcie profilowe
			</TextBlock>
			<AvatarChangeForm />
		</Section>

		<Section>
			<LoginManagement />
		</Section>

		<Section>
			<SignOutButton />
		</Section>
	</UserSettingsContainer>
)

export default UserSettings
