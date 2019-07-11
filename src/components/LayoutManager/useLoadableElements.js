import { useState, useCallback } from "react"

const useLoadableElements = (availableElements, options = {}) => {
	// get options
	const isRandom = options.isRandom || false
	const initialLoad = options.initialLoad || true

	const getRandomIndex = useCallback(() => {
		const min = 0
		const max = availableElements.length - 1
		const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min
		return randomIndex
	}, [availableElements])

	const getInitialState = () => {
		// if there is no initial load return empty array
		if (!initialLoad) return []
		// if the loading is sequential return array with first element
		if (!isRandom) return [availableElements[0]]
		// otherwise return array with random element
		const randomIndex = getRandomIndex()
		return [availableElements[randomIndex]]
	}

	// get initialState based on initialLoad option
	const [currentElements, setCurrentElements] = useState(getInitialState())

	const loadMore = useCallback(() => {
		const getSequential = () => {
			const nextIndex = currentElements.length
			const nextElement = availableElements[nextIndex]
			return nextElement
		}

		const getRandom = () => {
			// if there is only one element return it to prevent an infinite loop
			if (availableElements.length === 1) return availableElements[0]

			const lastElement = currentElements[currentElements.length - 1] || {}
			let nextElement = {}

			// get next element, if it's the same as last one, try again
			do {
				const randomIndex = getRandomIndex()
				nextElement = availableElements[randomIndex]
			} while (lastElement.title === nextElement.title)

			return nextElement
		}

		const nextElement = isRandom ? getRandom() : getSequential()
		if (!nextElement) return
		setCurrentElements((currentElements) => [...currentElements, nextElement])
	}, [availableElements, currentElements, getRandomIndex, isRandom])

	const hasMore = isRandom ? true : availableElements.length > currentElements.length

	return { elements: currentElements, loadMore, hasMore }
}

export default useLoadableElements
