import { AuthUserContext } from "../components/UserSession"
import { useContext } from "react"

export default (verbose = false) => {
	const authUser = useContext(AuthUserContext)
	const isAuthenticated = !!authUser

	return verbose ? [authUser, isAuthenticated] : authUser
}
