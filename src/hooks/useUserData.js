import { useEffect, useState } from "react"

import useFirebase from "./useFirebase"

export const useUserData = (userId, authUser, isAuthorized, forceRefresh, setForceRefresh) => {
  const firebase = useFirebase()
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthorized) {
        setUser(authUser)
      } else {
        const { user, error } = await firebase.getUserData(userId)
        setUser(user)
        setError(error)
      }
    }

    fetchUser()

    if (forceRefresh) {
      setForceRefresh(false)
    }
  }, [authUser, firebase, forceRefresh, isAuthorized, setForceRefresh, userId])

  return [user, error]
}

export default useUserData
