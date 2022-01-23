import { useContext } from "react"

import { AuthUserContext } from "../components/UserSession"

export const useAuthentication = () => {
  const authUser = useContext(AuthUserContext)
  return authUser
}

export default useAuthentication
