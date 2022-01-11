import { useEffect, useState, useCallback } from "react"

import useFirebase from "./useFirebase"

export default (userId, forceRefresh, setForceRefresh) => {
  const firebase = useFirebase()
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  const fetchUser = useCallback(async () => {
    const { user, error } = await firebase.getUserData(userId)
    setUser(user)
    setError(error)
  }, [firebase, userId])

  useEffect(() => {
    fetchUser()
    if (forceRefresh) {
      setForceRefresh(false)
    }
  }, [fetchUser, forceRefresh, setForceRefresh])

  return [user, error]
}
