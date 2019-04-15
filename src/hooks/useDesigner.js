import useFirebase from "./useFirebase"
import { useState, useEffect } from "react"

export default (selectedDesigner) => {
	const [designer, setDesigner] = useState(null)
	const firebase = useFirebase()

	const getDesigner = async (selectedDesigner) => {
		const snap = await firebase
			.designers()
			.where("label", "==", selectedDesigner)
			.get()

		let designersArr = []
		snap.forEach((a) => {
			designersArr.push(a.data())
		})

		setDesigner(designersArr[0])
	}

	useEffect(() => {
		getDesigner(selectedDesigner)
	}, [selectedDesigner])

	return designer
}
