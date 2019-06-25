import { route } from "."

export default (location) =>
	location.state ? location.state.redirectTo : { pathname: route("HOME") }
