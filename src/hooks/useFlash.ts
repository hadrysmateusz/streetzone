import { useContext } from "react"

import { FlashContext } from "../components/FlashMessages"

export const useFlash = () => {
  const context = useContext(FlashContext)
  if(!context) {
    throw new Error("Can't use useFlash outside of provider component")
  }
  return context
}

export default useFlash
