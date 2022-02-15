import React, { useCallback, useEffect, useState } from "react"
import { SaveButtonTypes, TYPE } from "./saveButtonTypes"
import { useAuthentication, useFirebase, useFlash } from "../../hooks"

export const useSave = (type: SaveButtonTypes, id: string) => {
  const { attribute, actionType } = TYPE[type]

  const authUser = useAuthentication()
  const flashMessage = useFlash()
  const firebase = useFirebase()

  const [isActive, setIsActive] = useState(false)

  const isAuthenticated = !!authUser

  useEffect(() => {
    if (!authUser) return undefined
    const isActive = authUser[attribute] && authUser[attribute].includes(id)
    setIsActive(isActive)
  }, [authUser, id, setIsActive, attribute])

  const toggleSave = useCallback(async () => {
    if (!authUser) {
      flashMessage({
        type: "error",
        text: "Zaloguj się by zapisywać",
      })
      return undefined
    }

    const wasActive = isActive
    // Assume the operation will be successful and set state early
    setIsActive(!wasActive)

    try {
      // Get the old list
      const oldList = authUser[attribute] || []
      // Either delete or add to the list
      const newList = wasActive
        ? oldList.filter((a) => a !== id)
        : [...oldList, id]
      // Update the db
      await firebase.updateUser(authUser.uid, { [attribute]: newList })

      // TODO: improve the copy here
      flashMessage({
        type: "success",
        text: wasActive ? "Usunięto z zapisanych" : "Zapisano!",
        details: !wasActive
          ? "Zapisane rzeczy znajdziesz w odpowiedniej zakładce na swoim profilu"
          : undefined,
      })
    } catch (error) {
      flashMessage({ type: "error", text: "Wystąpił błąd" })
      console.error(error)
      // Revert the state change if there was an error
      setIsActive(wasActive)
    }
  }, [attribute, authUser, firebase, flashMessage, id, isActive])

  const toggleFollow = useCallback(async () => {
    if (!authUser) {
      flashMessage({
        type: "error",
        text: "Zaloguj się by zapisywać",
      })
      return undefined
    }

    const wasActive = isActive
    // Assume the operation will be successful and set state early
    setIsActive(!wasActive)

    try {
      if (!wasActive) {
        // add user to list of subscribers
        firebase.db
          .collection(attribute)
          .doc(id)
          .collection("subscribers")
          .doc(authUser.uid)
          .set({ isSubscribed: true })

        // add to user's list
        await firebase.updateUser(authUser.uid, {
          [attribute]: firebase.FieldValue.arrayUnion(id),
        })
      } else {
        // remove user from list of subscribers
        firebase.db
          .collection(attribute)
          .doc(id)
          .collection("subscribers")
          .doc(authUser.uid)
          .delete()

        // remove from user's list
        await firebase.updateUser(authUser.uid, {
          [attribute]: firebase.FieldValue.arrayRemove(id),
        })
      }

      flashMessage({
        type: "success",
        text: wasActive ? "Usunięto z obserwowanych" : "Zaobserwowano!",
      })
    } catch (error) {
      flashMessage({ type: "error", text: "Wystąpił błąd" })
      console.error(error)
      // Revert the state change if there was an error
      setIsActive(wasActive)
    }
  }, [attribute, authUser, firebase, flashMessage, id, isActive])

  const onClick = useCallback<React.MouseEventHandler>(
    async (e) => {
      e.preventDefault()
      e.stopPropagation()

      switch (actionType) {
        case "save":
          await toggleSave()
          break
        case "follow":
          await toggleFollow()
          break
        default:
          throw Error("Invalid action type")
      }
    },
    [actionType, toggleFollow, toggleSave]
  )

  return { isActive, isAuthenticated, onClick }
}
