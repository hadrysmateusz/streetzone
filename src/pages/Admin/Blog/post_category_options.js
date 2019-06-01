import { POST_CATEGORIES } from "../../../constants"

export default Object.freeze(
	Object.values(POST_CATEGORIES).map((cat) => ({ value: cat, label: cat }))
)
