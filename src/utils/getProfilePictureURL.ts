import { ThumbnailSizePostfix } from "../types"
import {User} from "../schema";


export interface IWithProfilePictures {
  profilePictureURLs: User["profilePictureURLs"]
}

export function getProfilePictureURL(
  user: IWithProfilePictures,
  size: ThumbnailSizePostfix
): string {
  if (user && user.profilePictureURLs) {
    let urlIndex = 0
    if (size === "S") {
      urlIndex = 1
    } else if (size === "M") {
      urlIndex = 2
    } else if (size === "L") {
      urlIndex = 3
    }
    if (user.profilePictureURLs[urlIndex]) {
      return user.profilePictureURLs[urlIndex]
    } else if (user.profilePictureURLs[0]) {
      return user.profilePictureURLs[0]
    }
  }
  return ""
}

export default getProfilePictureURL
