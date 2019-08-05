import { useEffect, useState } from "react"
import { getImageUrl } from "../utils/getImageUrl"
import { CustomFile } from "../components/FileHandler"

import { useFirebase } from "."

const useInitialValues = (path, imagesConfig = [], transform = (a) => a) => {
	const firebase = useFirebase()
	const [initialValues, setInitialValues] = useState(null)

	useEffect(() => {
		const getData = async () => {
			const snap = await firebase.db.doc(path).get()

			let data = snap.data()

			imagesConfig.forEach(({ key, fieldName }) => {
				// look for key specified in config
				let value = data[key]

				if (Array.isArray(value)) {
					// if value is array, process all of its elements
					data[fieldName] = value.map(
						(ref) =>
							new CustomFile({
								storageRef: ref,
								previewUrl: getImageUrl(ref, "M"),
								isUploaded: true
							})
					)
				} else {
					// otherwise process the single element
					data[fieldName] = new CustomFile({
						storageRef: value,
						previewUrl: getImageUrl(value, "M"),
						isUploaded: true
					})
				}
			})

			data = transform(data)

			return data
		}

		setInitialValues(getData())
	}, [firebase.db, imagesConfig, path, transform])

	return initialValues
}

export default useInitialValues
