import makeRoute from "./route"

test("creates route with given name", () => {
	const route = makeRoute("TEST_ROUTE")
	expect(route).toBe("route")
})

test("throws if given wrong name", () => {
	const name = "TEST_WRONG_NAME"
	expect(() => {
		makeRoute(name)
	}).toThrow(`Route (${name}) doesn't exist`)
})

test("creates route with single route param", () => {
	const route = makeRoute("TEST_ROUTE_WITH_SUBROUTE", { one: "subroute" })
	expect(route).toBe("route/subroute")
})

test("creates route with multiple route params", () => {
	const route = makeRoute("TEST_ROUTE_WITH_MULTIPLE_SUBROUTES", {
		one: "level1",
		two: "level2"
	})
	expect(route).toBe("route/level1/level2")
})

test("creates route with single search param", () => {
	const route = makeRoute("TEST_ROUTE", null, { id: "1234" })
	expect(route).toBe("route?id=1234")
})

test("creates route with multiple search params", () => {
	const route = makeRoute("TEST_ROUTE", null, { id: "1234", user: "asdf" })
	expect(route).toBe("route?id=1234&user=asdf")
})

test("creates complex routes", () => {
	const route = makeRoute(
		"TEST_ROUTE_WITH_MULTIPLE_SUBROUTES",
		{
			one: "level1",
			two: "level2"
		},
		{ id: "1234", user: "asdf" }
	)
	expect(route).toBe("route/level1/level2?id=1234&user=asdf")
})
