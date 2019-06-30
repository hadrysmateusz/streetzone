import { useState, useEffect } from "react"

export default (time) => {
	const [isDone, setIsDone] = useState(false)

	useEffect(() => {
		const timeoutId = setTimeout(() => setIsDone(true), time)
		return () => clearTimeout(timeoutId)
	}, [time])

	return isDone
}

export const useNewDelayRender = (render, delay) => {
	const [isDone, setIsDone] = useState(delay === 0)

	if (!delay) {
		console.warn(
			"Delay was not set in a delayRender hook (the component will render without delay)"
		)
	}

	useEffect(() => {
		// render immediately if delay is set to 0
		if (delay === 0) return

		const timeoutId = setTimeout(() => setIsDone(true), delay)
		return () => clearTimeout(timeoutId)
	}, [delay])

	return isDone ? render : null
}
