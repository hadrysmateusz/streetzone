import { ROUTES } from "../constants"

export default (name, params) => {
	let route = ROUTES[name]

	if (params && typeof params === "object") {
		const entries = Object.entries(params)
		entries.forEach(([paramName, paramVal]) => {
			const toFind = `:${paramName}`
			const replaceWith = encodeURIComponent(paramVal)
			route = route.replace(toFind, replaceWith)
		})
	}

	return route
}
