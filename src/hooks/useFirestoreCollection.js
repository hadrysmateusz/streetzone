import { useState, useEffect } from "react"

import useFirebase from "./useFirebase"

export default (collection) => {
	const firebase = useFirebase()
	const [items, setItems] = useState(null)

	useEffect(() => {
		const getData = () => {
			const unsubscribe = firebase.db.collection(collection).onSnapshot((snap) => {
				const itemsData = snap.docs.map((doc) => doc.data())
				setItems(itemsData)
			})

			return unsubscribe
		}

		getData()
	}, [collection, firebase.db])

	return items
}
