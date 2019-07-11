import formatUserData from "../../utils/formatUserData"
import styled from "styled-components/macro"

// constants - don't change in production
const FACEBOOK_NAME = "facebook"
const GOOGLE_NAME = "google"

export const socialMediaSites = {
	facebook: {
		name: FACEBOOK_NAME,
		label: "Facebook",
		signInMethodName: "signInWithFacebook",
		buttonText: "Zaloguj się przez Facebooka",
		provider: "facebookProvider"
	},
	google: {
		name: GOOGLE_NAME,
		label: "Google",
		signInMethodName: "signInWithGoogle",
		buttonText: "Zaloguj się przez Google",
		provider: "googleProvider"
	}
}

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

export const Heading = styled.h1`
	text-align: center;
	color: var(--black25);
	font-weight: var(--semi-bold);
	margin-bottom: var(--spacing3);
	margin-top: 0px;
`

export const LinkContainer = styled.div`
	margin-top: calc(var(--spacing3) - 3px);
`
