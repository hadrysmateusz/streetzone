import { useState, useEffect } from "react"
import useFirebase from "./useFirebase"

import { makeReactSelectOption } from "../utils"

export default () => {
	const firebase = useFirebase()
	const [options, setOptions] = useState([])

	useEffect(() => {
		const getDesigners = async () => {
			const snap = await firebase.designers().get()
			let designersArr = []
			snap.forEach((designer) => {
				const designerName = designer.data().label
				const designerOption = makeReactSelectOption(designerName)
				designersArr.push(designerOption)
			})
			setOptions(designersArr)
		}

		getDesigners()
	}, [firebase])

	return options
}
