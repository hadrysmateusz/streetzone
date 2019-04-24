import React from "react"

import LoginManagement from "../../components/LoginManagement"
import SignOutButton from "../../components/SignOut"
import ProfileEdit from "../../components/ProfileEdit"
import { PageContainer } from "../../components/Containers"
import { Separator } from "../../components/Basics"
import { Button } from "../../components/Button"

import { useFirebase } from "../../hooks"

import { UserSettingsContainer, Section } from "./StyledComponents"
import UserPreferences from "./UserPreferences"

const DeleteAccountButton = () => {
	const firebase = useFirebase()

	const onDelete = async () => {
		const confirmation = window.confirm(
			"Czy napewno chcesz usunąć swoje konto? Tej akcji nie można cofnąć."
		)

		if (!confirmation) return

		/* TODO: email+password doesn't work yet. this needs a lot more work to communicate to the user what they need to do and the ui needs to reflect that */
		try {
			await firebase.auth.currentUser.delete()
		} catch (error) {
			if (error.code === "auth/requires-recent-login") {
				const user = firebase.auth.currentUser

				const signInMethods = await firebase.auth.fetchSignInMethodsForEmail(user.email)

				// try google
				if (signInMethods.includes(firebase.signInMethods.google)) {
					await user.reauthenticateWithPopup(firebase.googleProvider)
					await firebase.auth.currentUser.delete()

					return null
				}

				// try facebook
				if (signInMethods.includes(firebase.signInMethods.facebook)) {
					await user.reauthenticateWithPopup(firebase.facebookProvider)
					await firebase.auth.currentUser.delete()

					return null
				}

				// try email and password
				if (signInMethods.includes(firebase.signInMethods.email))
					return async (password) => {
						const credential = firebase.emailAuthProvider.credential(user.email, password)
						await user.reauthenticateAndRetrieveDataWithCredential(credential)
						await firebase.auth.currentUser.delete()
					}
			} else {
				// if there was a different error, rethrow it
				throw error
			}
		}
	}

	return (
		<Button onClick={onDelete} big fullWidth>
			Usuń konto
		</Button>
	)
}

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
