import { useState, useEffect } from "react"
import useFirebase from "./useFirebase"

export default () => {
	const firebase = useFirebase()
	const [designers, setDesigners] = useState(null)

	const getDesigners = async () => {
		const snap = await firebase.designers().get()
		let designersArr = []
		snap.forEach((designer) => {
			console.log(designer, designer.data())
			designersArr.push(designer.data())
		})
		setDesigners(designersArr)
	}

	useEffect(() => {
		getDesigners()
	}, [])

	return designers
}
