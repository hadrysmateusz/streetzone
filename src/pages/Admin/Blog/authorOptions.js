import { AUTHORS } from "../../../constants"

export default Object.freeze(
	Object.values(AUTHORS).map((a) => ({ value: a.name, label: a.name }))
)
