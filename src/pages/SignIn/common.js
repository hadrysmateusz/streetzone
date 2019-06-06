import { route } from "../../utils"
import formatUserData from "../../utils/formatUserData"

// constants - don't change in production
const FACEBOOK_NAME = "facebook"
const GOOGLE_NAME = "google"

export const socialMediaSites = {
	facebook: {
		name: FACEBOOK_NAME,
		label: "Facebook",
		signInMethodName: "signInWithFacebook",
		buttonText: "Zaloguj się przez Facebooka"
	},
	google: {
		name: GOOGLE_NAME,
		label: "Google",
		signInMethodName: "signInWithGoogle",
		buttonText: "Zaloguj się przez Google"
	}
}

export const getRedirectTo = (location) =>
	location.state ? location.state.redirectTo : { pathname: route("HOME") }

export const getUserInfoFromSocialProfile = (nameOfSite, socialAuthUser) => {
	switch (nameOfSite) {
		case GOOGLE_NAME:
			return formatUserData({
				name: socialAuthUser.user.displayName,
				email: socialAuthUser.user.email,
				picture: socialAuthUser.picture,
				importedFrom: GOOGLE_NAME
			})
		case FACEBOOK_NAME:
			return formatUserData({
				name: socialAuthUser.additionalUserInfo.profile.name,
				email: socialAuthUser.additionalUserInfo.profile.email,
				picture: socialAuthUser.picture,
				importedFrom: FACEBOOK_NAME
			})
		default:
			throw Error("Invalid social media provider")
	}
}
