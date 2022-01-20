import { route } from "./route"

export const getRedirectTo = (location) =>
  location.state ? location.state.redirectTo : { pathname: route("HOME") }

export default getRedirectTo
