import { S_THUMB_POSTFIX, M_THUMB_POSTFIX, L_THUMB_POSTFIX } from "../constants/const"

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
	// name of the default firebase storage bucket
	let bucket = process.env.REACT_APP_STORAGE_BUCKET
	// encode the storage path to match the actual url
	let imagePath = encodeURIComponent(storageRef)
	// construct the full url
	const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${imagePath}${suffix}?alt=media`
	return imageUrl
}

/**
 * Returns urls for the full-size image as well as all size variations
 * @param {string} storageRef Firebase storage ref of the image
 */
export const getImageUrls = (storageRef) => {
	// name of the default firebase storage bucket
	let bucket = process.env.REACT_APP_STORAGE_BUCKET
	// encode the storage path to match the actual url
	let imagePath = encodeURIComponent(storageRef)
	// construct all urls
	const full = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${imagePath}?alt=media`
	const large = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${imagePath}${L_THUMB_POSTFIX}?alt=media`
	const medium = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${imagePath}${M_THUMB_POSTFIX}?alt=media`
	const small = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${imagePath}${S_THUMB_POSTFIX}?alt=media`

	return { small, medium, large, full }
}
