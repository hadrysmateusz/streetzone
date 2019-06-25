/**
 * Returns a promise that will resolve in a set amount of time.
 * Useful for delaying execution
 * @param {Number} ms time to wait in milliseconds
 */
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export default sleep
