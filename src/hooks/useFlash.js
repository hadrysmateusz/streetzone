import { useContext } from "react"

import { FlashContext } from "../components/FlashMessages"

export const useFlash = () => {
  return useContext(FlashContext)
}

export default useFlash
