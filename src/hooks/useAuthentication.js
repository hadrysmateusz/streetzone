import { AuthUserContext } from "../components/UserSession"
import { useContext } from "react"

export default () => {
	return useContext(AuthUserContext)
}
