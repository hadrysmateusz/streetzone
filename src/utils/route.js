import { ROUTES } from "../constants"

export default (name, params) => {
	const route = ROUTES[name]

	if (params && typeof params === "object") {
		Object.entries(params).forEach(([paramName, paramVal]) => {
			route.replace(`:${paramName}`, paramVal)
		})
	}

	return route
}
