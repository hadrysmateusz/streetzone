import React from "react"

import LoginManagement from "../../components/LoginManagement"
import SignOutButton from "../../components/SignOut"
import ProfileEdit from "../../components/ProfileEdit"

import { UserSettingsContainer, Section } from "./StyledComponents"
import { Separator } from "../../components/Basics"

const UserSettings = () => (
	<UserSettingsContainer>
		<Section>
			<ProfileEdit />
		</Section>

		<Separator />

		<Section>
			<LoginManagement />
		</Section>

		<Separator />

		<Section>
			<SignOutButton />
		</Section>
	</UserSettingsContainer>
)

export default UserSettings
