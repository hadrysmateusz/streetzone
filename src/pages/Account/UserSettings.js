import React from "react"

import LoginManagement from "../../components/LoginManagement"
import SignOutButton from "../../components/SignOut"
import ProfileEdit from "../../components/ProfileEdit"
import { PageContainer } from "../../components/Containers"
import { Separator } from "../../components/Basics"

import { UserSettingsContainer, Section } from "./StyledComponents"
import UserPreferences from "./UserPreferences"

const UserSettings = () => (
	<PageContainer>
		<UserSettingsContainer>
			<Section>
				<ProfileEdit />
			</Section>

			<Separator />

			{/* <UserPreferences />

			<Separator /> */}

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
