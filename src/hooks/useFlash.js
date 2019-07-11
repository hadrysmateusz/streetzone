import { FlashContext } from "../components/FlashMessages"
import { useContext } from "react"

export default () => {
	return useContext(FlashContext)
}
