import { useState, useEffect } from "react"
import useFirebase from "./useFirebase"

const ERR_NO_IMAGE = "NO_IMAGE"

export default function useImage(imageId, size = "M") {
	const firebase = useFirebase()
	const [imageURL, setImageURL] = useState(null)
	const [error, setError] = useState(null)

	const fetchImage = async () => {
		try {
			const imageURL = await firebase.getImageURL(imageId, size)
			setImageURL(imageURL)
		} catch (error) {
			setError(ERR_NO_IMAGE)
			console.log(error)
		}
	}

	useEffect(() => {
		fetchImage()
	}, [imageId])

	return [imageURL, error]
}
