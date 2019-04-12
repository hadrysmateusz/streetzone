import React, { useState, useEffect, useRef, useCallback } from "react"

const useContentToggle = (initialState) => {
	const [isToggled, setIsToggled] = useState(initialState)

	const onClick = () => {
		setIsToggled(!isToggled)
	}

	const getToggleProps = () => {
		return {
			onClick,
			isToggled,
			style: { cursor: "pointer" }
		}
	}
	const getContentProps = () => {
		return {
			hidden: !isToggled
		}
	}

	return { getContentProps, getToggleProps, isToggled }
}

export default useContentToggle
