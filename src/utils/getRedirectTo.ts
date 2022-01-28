import type { useLocation } from "react-router"
import { route } from "./route"

type Location = ReturnType<typeof useLocation>

interface IWithRedirectTo {
  redirectTo: IWithPathname
}

interface IWithPathname {
  pathname: string
}

function hasRedirectTo(state: unknown): state is IWithRedirectTo {
  if (!state || typeof state !== "object") {
    return false
  }

  return (
    (state as IWithRedirectTo).redirectTo?.pathname !== undefined &&
    typeof (state as IWithRedirectTo).redirectTo?.pathname === "string"
  )
}

// TODO: this function seems to return unexpected values too often
export const getRedirectTo = (location: Location): IWithPathname => {
  if (hasRedirectTo(location.state)) {
    return location.state.redirectTo
  }

  return { pathname: route("HOME") }
}

export default getRedirectTo
