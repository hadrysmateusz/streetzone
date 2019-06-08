import React from "react"

import { Button } from "../../components/Button"

import { useFirebase } from "../../hooks"
import { CONST } from "../../constants"

import { getUserInfoFromSocialProfile, socialMediaSites } from "./common"

const SocialSignInButton = ({
	onError,
	onSuccess,
	name: nameOfSite,
	signInMethodName,
	buttonText
}) => {
	const firebase = useFirebase()

	const onSubmit = async (e) => {
		e.preventDefault()

		try {
			// attempt sign-in
			const socialAuthUser = await firebase[signInMethodName]()

			const { isNewUser } = socialAuthUser.additionalUserInfo

			// exit successfully if this isn't the users first login
			if (!isNewUser) {
				onSuccess("Witaj ponownie!")
			}

			// extract relevant data from user profile
			const userId = socialAuthUser.user.uid
			const userData = getUserInfoFromSocialProfile(nameOfSite, socialAuthUser)

			// upload the data to firebase
			await firebase.user(userId).set(userData)

			// exit successfully
			onSuccess(`Witaj w ${CONST.BRAND_NAME}!`)
		} catch (err) {
			// pass the error to handler
			onError(err)
		}
	}

	return (
		<form onSubmit={onSubmit}>
			<Button social={nameOfSite} fullWidth>
				{buttonText}
			</Button>
		</form>
	)
}

export const GoogleButton = (props) => {
	return <SocialSignInButton {...socialMediaSites.google} {...props} />
}

export const FacebookButton = (props) => {
	return <SocialSignInButton {...socialMediaSites.facebook} {...props} />
}
