export default () => {
	if (!("serviceWorker" in navigator)) {
		// Service Workers are not supported.
		return false
	}

	if (!("PushManager" in window)) {
		// The Push API is not supported.
		return false
	}

	return true
}
