import React from "react"
import AvatarChangeForm from "../AvatarChange"
import LoginManagement from "../LoginManagement"
import Separator from "../Separator"

const UserSettings = () => (
	<div>
		<Separator text="Zdjęcie profilowe" />
		<AvatarChangeForm />
		<LoginManagement />
	</div>
)

export default UserSettings
