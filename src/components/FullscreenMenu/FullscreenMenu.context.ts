import React, { useContext } from "react";

export type FullscreenMenuContextValue = {
  close: () => void
  open: () => void
  containerRef: React.MutableRefObject<HTMLElement | null>
}

export const FullscreenMenuContext =
  React.createContext<FullscreenMenuContextValue | null>(null)

export const useFullscreenMenu = () => {
  const context = useContext(FullscreenMenuContext)
  if (!context) {
    throw new Error(
      "useFullscreenMenu can't be used outside of FullscreenMenuContext.Provider"
    )
  }
  return context
}