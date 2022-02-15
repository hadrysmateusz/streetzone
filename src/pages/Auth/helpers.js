import { userModel } from "../../schema"

// constants - don't change in production
const FACEBOOK_NAME = "facebook"
const GOOGLE_NAME = "google"

export const socialMediaSites = {
  facebook: {
    name: FACEBOOK_NAME,
    label: "Facebook",
    signInMethodName: "signInWithFacebook",
    buttonText: "Zaloguj się przez Facebooka",
    provider: "facebookProvider",
  },
  google: {
    name: GOOGLE_NAME,
    label: "Google",
    signInMethodName: "signInWithGoogle",
    buttonText: "Zaloguj się przez Google",
    provider: "googleProvider",
  },
}

export const getUserInfoFromSocialProfile = (nameOfSite, socialAuthUser) => {
  switch (nameOfSite) {
    case GOOGLE_NAME:
      return userModel.formatForCreate({
        id: socialAuthUser.user.uid,
        name: socialAuthUser.user.displayName,
        email: socialAuthUser.user.email,
        profilePictureURLs: [socialAuthUser.picture],
        importedFrom: GOOGLE_NAME,
      })
    case FACEBOOK_NAME:
      return userModel.formatForCreate({
        id: socialAuthUser.user.uid,
        name: socialAuthUser.additionalUserInfo.profile.name,
        email: socialAuthUser.additionalUserInfo.profile.email,
        profilePictureURLs: [socialAuthUser.picture],
        importedFrom: FACEBOOK_NAME,
      })
    default:
      throw Error("Invalid social media provider")
  }
}
