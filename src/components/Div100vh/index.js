import { forwardRef, useState, useEffect, useCallback } from "react"

const Div100vh = forwardRef(({ style = {}, ...rest }, ref) => {
  const [newStyle, setNewStyle] = useState()

  const updateStyle = useCallback(() => {
    const height = window.innerHeight
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
