import { useEffect, useState } from "react"

import useFirebase from "./useFirebase"

export default (userId, forceRefresh, setForceRefresh) => {
	const firebase = useFirebase()
	const [error, setError] = useState(null)
	const [user, setUser] = useState(null)

	const fetchUser = async () => {
		const { user, error } = await firebase.getUserData(userId)
		setUser(user)
		setError(error)
	}

	useEffect(() => {
		fetchUser()
		if (forceRefresh) {
			setForceRefresh(false)
		}
	}, [userId, forceRefresh])

	return [user, error]
}
