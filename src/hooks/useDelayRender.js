import { useState, useEffect } from "react"

export default (time) => {
	const [isDone, setIsDone] = useState(false)

	useEffect(() => {
		const timeoutId = setTimeout(() => setIsDone(true), time)
		return () => clearTimeout(timeoutId)
	}, [])

	return isDone
}
