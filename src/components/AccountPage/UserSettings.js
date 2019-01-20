import React from "react"
import AvatarChangeForm from "../AvatarChange"
import LoginManagement from "../LoginManagement"
import Separator from "../Separator"
import SignOutButton from "../SignOut"

const UserSettings = () => (
	<div>
		<Separator>Zdjęcie profilowe</Separator>
		<AvatarChangeForm />
		<LoginManagement />
		<SignOutButton />
	</div>
)

export default UserSettings
