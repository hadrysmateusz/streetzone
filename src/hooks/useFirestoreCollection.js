import { useState, useEffect } from "react"

import useFirebase from "./useFirebase"

export const useFirestoreCollection = (collection) => {
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

/**
 * creates a listener on the specified collection in firestore and provides live updates for items in the collection as well as some helper properties, the returned results use the collection name for their key
 * @param {string} collection name of the collection
 */
export const useLiveCollection = (collection) => {
	const firebase = useFirebase()
	const [results, setResults] = useState(null)
	const [isEmpty, setIsEmpty] = useState(false)

	useEffect(() => {
		const unsubscribe = firebase.db.collection(collection).onSnapshot((snap) => {
			if (snap.empty) {
				setIsEmpty(true)
				setResults([])
				return
			}

			const __results = snap.docs.map((doc) => doc.data())
			setResults(__results)
		})

		return unsubscribe
	}, [collection, firebase.db])

	// results are returned under the name of the collection for convenience, but also under the 'results' key for the rare situations where the you don't know or can't change the key
	return {
		results,
		[collection]: results,
		isLoading: !isEmpty && !results,
		isEmpty
	}
}

/**
 * returns all documents in a firestore collection and provides some helper properties
 * @param {string} collection name of the collection
 * @todo test this
 */
export const useCollection = (collection) => {
	const firebase = useFirebase()
	const [results, setResults] = useState(null)
	const [isEmpty, setIsEmpty] = useState(false)

	useEffect(() => {
		const get = async () => {
			const snap = await firebase.db.collection(collection).get()
			if (snap.empty) {
				setIsEmpty(true)
				setResults([])
				return
			}

			const __results = snap.docs.map((doc) => doc.data())
			setResults(__results)
		}
		get()
	}, [collection, firebase.db])

	// results are returned under the name of the collection for convenience, but also under the 'results' key for the rare situations where the you don't know or can't change the key
	return {
		results,
		[collection]: results,
		isLoading: !isEmpty && !results,
		isEmpty
	}
}
