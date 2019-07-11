import { ROUTES } from "../constants"

export default (name, routeParams, searchParams) => {
	let route = ROUTES[name]

	if (!route) {
		throw new Error(`Route (${name}) doesn't exist`)
	}

	if (routeParams && typeof routeParams === "object") {
		const entries = Object.entries(routeParams)
		entries.forEach(([paramName, paramVal]) => {
			const toFind = `:${paramName}`
			const replaceWith = encodeURIComponent(paramVal)
			route = route.replace(toFind, replaceWith)
		})
	}

	if (searchParams) {
		route += "?"
		const entries = Object.entries(searchParams)
		entries.forEach(([paramName, paramVal], i) => {
			route += `${paramName}=${paramVal}`
			if (entries[i + 1]) {
				route += "&"
			}
		})
	}

	return route
}
