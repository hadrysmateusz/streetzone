import { POST_CATEGORIES } from "../../../constants"

export default Object.freeze(
	Object.values(POST_CATEGORIES).map((a) => ({ value: a, label: a }))
)
