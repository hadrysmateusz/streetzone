import { FORM_ERR } from "../../../../constants"

export default ({ author, title, section, mainContent, mainImage, dropsAt }) => {
	const errors = {}

	if (!title) {
		errors.title = FORM_ERR.IS_REQUIRED
	}

	if (!section) {
		errors.section = FORM_ERR.IS_REQUIRED
	} else {
		if (section !== "drops" && !author) {
			errors.author = FORM_ERR.IS_REQUIRED
		}
	}

	if (!mainContent) {
		errors.mainContent = FORM_ERR.IS_REQUIRED
	}

	if (!mainImage) {
		errors.mainImage = FORM_ERR.IS_REQUIRED
	}

	console.log(errors)
	return errors
}
