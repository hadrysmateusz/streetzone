import { useState } from "react"

const useCarousel = (nOfElements, onChangeIndex) => {
	const [current, setCurrent] = useState(0)
	const lastIndex = nOfElements - 1

	const changeIndex = (val) => {
		// wrap the index
		if (val < 0) {
			val = lastIndex
		} else {
			val = val % nOfElements
		}

		// trigger external handler
		if (onChangeIndex) {
			onChangeIndex(val)
		}

		// update internal value
		setCurrent(val)
	}

	const previous = () => {
		changeIndex(current - 1)
	}

	const next = () => {
		changeIndex(current + 1)
	}

	const hasLeft = current > 0
	const hasRight = current < lastIndex

	return { hasLeft, hasRight, changeIndex, previous, next, current }
}

export default useCarousel
