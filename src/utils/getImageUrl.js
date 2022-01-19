import CONST from "../constants/const"
const { S_THUMB_POSTFIX, M_THUMB_POSTFIX, L_THUMB_POSTFIX } = CONST

/**
 * Returns a suffix used to mark resized versions of an image in firebase storage
 * @param {string} size Can be one of (S M L). If not specified the function will return an empty string
 */
export const getSuffixForSize = (size) => {
  switch (size) {
    case "S":
      return S_THUMB_POSTFIX
    case "M":
      return M_THUMB_POSTFIX
    case "L":
      return L_THUMB_POSTFIX
    default:
      return ""
  }
}

/**
 * Constructs the url for image in firebase storage from a storage ref
 * @param {string} storageRef Firebase storage ref of the image
 * @param {string} size Size of image to fetch, can be one of (S M L). If not specified the full size image will be used
 */
export const getImageUrl = (storageRef, size) => {
  // get suffix for the specified size
  let suffix = getSuffixForSize(size)
  // encode the storage path to match the actual url
  let imagePath = encodeURIComponent(storageRef)
  // construct the full url
  const imageUrl = `${CONST.DEFAULT_STORAGE_BUCKET}${imagePath}${suffix}?alt=media`
  return imageUrl
}

/**
 * Returns urls for the full-size image as well as all size variations
 * @param {string} storageRef Firebase storage ref of the image
 */
export const getImageUrls = (storageRef) => {
  // encode the storage path to match the actual url
  let imagePath = encodeURIComponent(storageRef)
  // construct all urls
  const full = `${CONST.DEFAULT_STORAGE_BUCKET}${imagePath}?alt=media`
  const large = `${CONST.DEFAULT_STORAGE_BUCKET}${imagePath}${L_THUMB_POSTFIX}?alt=media`
  const medium = `${CONST.DEFAULT_STORAGE_BUCKET}${imagePath}${M_THUMB_POSTFIX}?alt=media`
  const small = `${CONST.DEFAULT_STORAGE_BUCKET}${imagePath}${S_THUMB_POSTFIX}?alt=media`

  return { S: small, M: medium, L: large, original: full }
}
