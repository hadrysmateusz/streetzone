import { useState, useEffect } from "react"
import useFirebase from "./useFirebase"

const ERR_NO_IMAGE = "NO_IMAGE"

export default function useImage(storageRef, size, defer) {
	const firebase = useFirebase()
	const [imageURL, setImageURL] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchUrl = async () => {
			try {
				const imageURL = await firebase.getImageURL(storageRef, size)
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
	}, [storageRef, size, defer])

	// for convenience, return an isLoading flag if there is no image yet, but also no error
	const isLoading = !imageURL && !error

	return { imageURL, error, isLoading }
}
