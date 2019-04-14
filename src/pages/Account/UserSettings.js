import React from "react"

import LoginManagement from "../../components/LoginManagement"
import SignOutButton from "../../components/SignOut"
import ProfileEdit from "../../components/ProfileEdit"
import { PageContainer } from "../../components/Containers"

import { UserSettingsContainer, Section } from "./StyledComponents"
import { Separator } from "../../components/Basics"

const UserSettings = () => (
	<PageContainer>
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
	</PageContainer>
)

export default UserSettings
