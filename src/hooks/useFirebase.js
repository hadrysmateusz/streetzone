import { FirebaseContext } from "../components/Firebase"
import { useContext } from "react"

export default () => {
	return useContext(FirebaseContext)
}
