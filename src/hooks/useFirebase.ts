import { FirebaseContext } from "../components/Firebase"
import { useContext } from "react"

export const useFirebase = () => {
  const context = useContext(FirebaseContext)
  if (!context) {
    throw new Error("useFirebase can't be used outside the FirebaseContext provider")
  }
  return context
}
export default useFirebase
