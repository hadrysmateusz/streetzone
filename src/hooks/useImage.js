import { useState, useEffect } from "react"
import useFirebase from "./useFirebase"

import { S_THUMB_POSTFIX, M_THUMB_POSTFIX, L_THUMB_POSTFIX } from "../constants/const"

const ERR_NO_IMAGE = "NO_IMAGE"

const getSuffixForSize = (size) => {
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

export default function useImage(storageRef, size, defer) {
	const firebase = useFirebase()
	const [imageURL, setImageURL] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchUrl = async () => {
			try {
				let suffix = getSuffixForSize(size)
				let bucket = process.env.REACT_APP_STORAGE_BUCKET
				let imagePath = encodeURIComponent(storageRef)
				const imageURL = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${imagePath}${suffix}?alt=media`

				setImageURL(imageURL)
			} catch (error) {
				setError(ERR_NO_IMAGE)
				console.log(error)
			}
		}

		// exit if the defer flag is set
		if (defer) return

		// fetch the image
		fetchUrl()
	}, [storageRef, size, defer, firebase])

	// for convenience, return an isLoading flag if there is no image yet, but also no error
	const isLoading = !imageURL && !error

	return { imageURL, error, isLoading }
}
