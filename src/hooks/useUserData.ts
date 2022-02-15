import { useCallback, useEffect, useState } from "react"

import useFirebase from "./useFirebase"
import { User } from "../schema"

export const useUserData = (userId: string) => {
  const firebase = useFirebase()

  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = useCallback(async () => {
    const { user, error } = await firebase.getUserData(userId)
    setUser(user ?? null)
    setError(error ?? null)
  }, [firebase, userId])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return [user, error, fetchUser] as [User | null, string | null, () => void]
}

export default useUserData
