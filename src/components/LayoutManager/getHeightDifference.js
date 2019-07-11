/**
 * Gets height difference between two components, based on their refs
 * @param refOne ref of the first component
 * @param refTwo ref of the second component
 */
const getDifference = (refOne, refTwo) => {
	// exit if any of the refs are not bound to avoid errors
	if (!refOne.current || !refTwo.current) {
		console.warn("One of the refs isn't currently bound")
		return 0
	}

	const heightOne = refOne.current.clientHeight
	const heightTwo = refTwo.current.clientHeight
	return Math.max(heightOne - heightTwo, 0)
}

export default getDifference
