import React, { forwardRef, useState, useEffect, useCallback } from "react"

function getWindowHeight() {
  return window.innerHeight
}

const Div100vh = forwardRef(({ style = {}, ...rest }, ref) => {
  const [newStyle, setNewStyle] = useState()

  const updateStyle = useCallback(() => {
    const height = getWindowHeight()
    const newStyle = height ? { ...style, height: height + "px" } : style
    setNewStyle(newStyle)
  }, [style])

  useEffect(() => {
    updateStyle()
    window.addEventListener("resize", updateStyle)
    return () => window.removeEventListener("resize", updateStyle)
  }, [updateStyle])

  return <div {...rest} style={newStyle} ref={ref} />
})

export default Div100vh
