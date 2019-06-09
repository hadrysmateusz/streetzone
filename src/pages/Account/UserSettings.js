import React from "react"
import { withRouter } from "react-router-dom"

import LoginManagement from "../../components/LoginManagement"
import SignOutButton from "../../components/SignOut"
import ProfileEdit from "../../components/ProfileEdit"
import ChangeEmail from "../../components/ProfileEdit/ChangeEmail"

import { PageContainer } from "../../components/Containers"
import { Separator } from "../../components/Basics"
import { Button } from "../../components/Button"

import { useFunctionWithReauthentication } from "../Auth/Reauthentication"

import { useFirebase, useFlash } from "../../hooks"
import { route } from "../../utils"

import { UserSettingsContainer, Section } from "./StyledComponents"

const DeleteAccountButton = withRouter(({ history }) => {
	const firebase = useFirebase()
	const flashMessage = useFlash()

	// portion of the function which should rerun after reauth
	const [
		onDeleteWithReauthentication,
		reauthenticationModal
	] = useFunctionWithReauthentication(async () => {
		// delete the auth user
		await firebase.auth.currentUser.delete()

		// exit successfully
		flashMessage("Konto zostało usunięte")
		history.push(route("HOME"))
	})

	const onDelete = async () => {
		// get confirmation from user
		const message = "Czy napewno chcesz usunąć swoje konto? Tej akcji nie można cofnąć."
		const confirmation = window.confirm(message)
		if (!confirmation) return

		try {
			await onDeleteWithReauthentication()
		} catch (err) {
			console.log(err)
			alert("Wystąpił problem. Konto mogło nie zostać usunięte.")
		}
	}

	return (
		<>
			{reauthenticationModal()}
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

			<Section>
				<ChangeEmail />
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

			<Section>
				<DeleteAccountButton />
			</Section>
		</UserSettingsContainer>
	</PageContainer>
)

export default UserSettings
