import { useEffect, useState } from "react"

import useFirebase from "./useFirebase"

export default (userId, authUser, isAuthorized) => {
	const firebase = useFirebase()
	const [user, setUser] = useState(null)
	const [error, setError] = useState(null)

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
	}, [userId, authUser])

	return [user, error]
}
