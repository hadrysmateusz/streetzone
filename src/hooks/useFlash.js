import { FlashContext } from "../components/FlashMessages"
import { useContext } from "react"

export const useFlash = () => {
  return useContext(FlashContext)
}

export default useFlash
