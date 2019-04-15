import { useEffect, useState } from "react"

import useFirebase from "./useFirebase"

export default (userId, authUser, isAuthorized, forceRefresh, setForceRefresh) => {
	const firebase = useFirebase()
	const [error, setError] = useState(null)
	const [user, setUser] = useState(null)

	const fetchUser = async () => {
		if (isAuthorized) {
			setUser(authUser)
		} else {
			const { user, error } = await firebase.getUserData(userId)
			setUser(user)
			setError(error)
		}
	}

	useEffect(() => {
		fetchUser()
		if (forceRefresh) {
			setForceRefresh(false)
		}
	}, [userId, authUser, forceRefresh])

	return [user, error]
}
