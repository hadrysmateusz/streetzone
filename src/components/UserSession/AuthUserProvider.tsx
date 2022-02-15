import React, { useEffect, useState } from "react"

import { MergedUser } from "../../types"
import { useFirebase } from "../../hooks"

import AuthUserContext from "./context"

// TODO: make the naming of authUser and mergedUser consistent across the whole app
export const AuthUserProvider: React.FC = ({ children }) => {
  const firebase = useFirebase()

  const [authUser, setAuthUser] = useState<MergedUser | null>(() => {
    const valueFromLocalStorage = localStorage.getItem("authUser")
    return valueFromLocalStorage ? JSON.parse(valueFromLocalStorage) : null
  })
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true)

  // const [mergedUser, setMergedUser] = useState<MergedUser | null>(() => {
  //   const valueFromLocalStorage = localStorage.getItem("authUser")
  //   return valueFromLocalStorage ? JSON.parse(valueFromLocalStorage) : null
  // })

  // Keep track of changes to auth status and record the current authUser in internal state
  useEffect(() => {
    const removeAuthListener = firebase.onAuthUserListener((authUser) => {
      if (!authUser) {
        // Update state and remove user from local storage
        localStorage.removeItem("authUser")
        setAuthUser(null)
        setIsAuthenticating(false)
        return
      }

      setAuthUser(authUser)
      setIsAuthenticating(false)
    })

    return () => removeAuthListener()
  }, [firebase])

  // If user is authenticated, subscribe to the user's data in firestore and put the merged user data in state to share through context
  // useEffect(() => {
  //   if (!authUser) {
  //     setMergedUser(null)
  //     setIsAuthenticating(false)
  //     return undefined
  //   }
  //
  //   const userId = authUser.uid
  //
  //   const removeDbListener = firebase.user(userId).onSnapshot(async (user) => {
  //     // get current user's info from database
  //     const dbUser = user.data()
  //
  //     if (!dbUser) {
  //       // TODO: handle this better
  //       throw new Error("No data in db for this user")
  //     }
  //
  //     // merge auth and db user
  //     const mergedUser: MergedUser = {
  //       uid: userId,
  //       emailVerified: authUser.emailVerified,
  //       ...dbUser,
  //     }
  //
  //     localStorage.setItem("authUser", JSON.stringify(authUser))
  //     setMergedUser(mergedUser)
  //     setIsAuthenticating(false)
  //   })
  //
  //   return () => removeDbListener()
  // }, [authUser, firebase])

  return isAuthenticating ? null : (
    <AuthUserContext.Provider value={authUser}>
      {children}
    </AuthUserContext.Provider>
  )
}

export default AuthUserProvider
