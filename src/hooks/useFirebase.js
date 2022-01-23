import { useContext } from "react"

import { FirebaseContext } from "../components/Firebase"

export const useFirebase = () => {
  return useContext(FirebaseContext)
}

export default useFirebase
