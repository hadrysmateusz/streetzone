import React from "react"
import { withRouter } from "react-router-dom"

import LoginManagement from "../../components/LoginManagement"
import SignOutButton from "../../components/SignOut"
import ProfileEdit from "../../components/ProfileEdit"
import { PageContainer } from "../../components/Containers"
import { Separator } from "../../components/Basics"
import { Button } from "../../components/Button"

import { useFunctionWithReauthentication } from "../Auth/Reauthentication"

import { useFirebase, useFlash } from "../../hooks"
import { route } from "../../utils"

import { UserSettingsContainer, Section } from "./StyledComponents"
import UserPreferences from "./UserPreferences"

const DeleteAccountButton = withRouter(({ history }) => {
	const firebase = useFirebase()
	const flashMessage = useFlash()

	const [
		deleteWithReauthentication,
		renderReauthenticationModal
	] = useFunctionWithReauthentication(async () => {
		await firebase.auth.currentUser.delete()
	})

	const onDelete = async () => {
		// get confirmation from user
		const message = "Czy napewno chcesz usunąć swoje konto? Tej akcji nie można cofnąć."
		const confirmation = window.confirm(message)
		if (!confirmation) return

		try {
			await deleteWithReauthentication()
			flashMessage("Konto zostało usunięte")
			history.push(route("HOME"))
		} catch (err) {
			console.log(err)
			alert("Wystąpił problem. Konto mogło nie zostać usunięte.")
		}
	}

	return (
		<>
			{renderReauthenticationModal()}
			<Button onClick={onDelete} big fullWidth danger>
				Usuń konto
			</Button>
		</>
	)
})

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
				<DeleteAccountButton />
			</Section>

			<Section>
				<SignOutButton />
			</Section>
		</UserSettingsContainer>
	</PageContainer>
)

export default UserSettings
