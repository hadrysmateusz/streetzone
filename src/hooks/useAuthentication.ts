import { useContext } from "react"

import { AuthUserContext } from "../components/UserSession"
import {MergedUser} from "../types";

export const useAuthentication = (
  authenticationRequired: boolean = false
): typeof authenticationRequired extends true
  ? MergedUser
  : MergedUser | null => {
  const authUser = useContext(AuthUserContext)
  if (authenticationRequired && !authUser) {
    // TODO: handle this more gracefully
    throw new Error("authentication required")
  }
  return authUser
}

export default useAuthentication
