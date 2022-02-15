import React, { useCallback } from "react"
import { OverlayContainer } from "./Overlay.styles"

const Overlay: React.FC<{
  color?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}> = ({ color, onClick, children }) => {
  const handleClick = useCallback(
    (e) => {
      if (e.currentTarget === e.target) {
        onClick?.(e)
      }
    },
    [onClick]
  )
  return (
    <OverlayContainer color={color} onClick={handleClick}>
      {children}
    </OverlayContainer>
  )
}

export default Overlay
