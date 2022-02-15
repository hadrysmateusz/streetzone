import firebase from "firebase/compat/app"
import useFirebase from "./useFirebase"
import { useEffect, useMemo, useState } from "react"

// TODO: refactor and merge with other firestore collection hooks
export const useFirestoreCollectionNew = <T>(collectionPath: string) => {
  const firebase = useFirebase()
  const [results, setResults] = useState<firebase.firestore.DocumentData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    return firebase.db.collection(collectionPath).onSnapshot((snap) => {
      if (snap.empty) {
        setResults([])
        setIsLoading(false)
        return
      }

      const __results = snap.docs.map((doc) => doc.data())

      setResults(__results)
      setIsLoading(false)
    })
  }, [collectionPath, firebase.db])

  return useMemo(
    () => ({
      // TODO: a more robust firestore api to enforce data types higher and not rely on manual casting (maybe a base path system bound to specific types with a helper used for any necessary param substitutions)
      data: results as T[],
      isLoading,
    }),
    [isLoading, results]
  )
}
