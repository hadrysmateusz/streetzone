import { THEME } from "../constants"

export default () => {
	const width = window.innerWidth

	if (width < THEME.breakpoints[1]) {
		return 2
	} else if (width < THEME.breakpoints[3]) {
		return 4
	} else if (width < THEME.breakpoints[5]) {
		return 3
	} else if (width >= THEME.breakpoints[5]) {
		return 4
	}
}
