import React, { forwardRef, useState, useEffect } from "react"

function getWindowHeight() {
	return window.innerHeight
}

const Div100vh = forwardRef(({ style, ...rest }, ref) => {
	const [newStyle, setNewStyle] = useState()

	const updateStyle = () => {
		style = style || {}
		const height = getWindowHeight()
		const newStyle = height ? { ...style, height: height + "px" } : style
		setNewStyle(newStyle)
	}

	useEffect(() => {
		updateStyle()
		window.addEventListener("resize", updateStyle)
		return () => window.removeEventListener("resize", updateStyle)
	})

	return <div {...rest} style={newStyle} ref={ref} />
})

export default Div100vh
