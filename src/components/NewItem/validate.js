import { FORM_ERR, CONST } from "../../constants"

export default (values) => {
	const { name, designers, price, category, condition, description, files } = values
	const errors = {}

	// Name
	if (!name) {
		errors.name = FORM_ERR.IS_REQUIRED
	}

	// Designers
	if (!designers || designers.length === 0) {
		errors.designers = FORM_ERR.IS_REQUIRED
	}

	// Price
	if (!price) {
		errors.price = FORM_ERR.IS_REQUIRED
	}

	// Category
	if (!category) {
		errors.category = FORM_ERR.IS_REQUIRED
	}

	// Condition
	if (!condition) {
		errors.condition = FORM_ERR.IS_REQUIRED
	}

	// Description
	if (description && description.length > CONST.DESC_MAX_CHARACTERS) {
		errors.description = FORM_ERR.DESC_TOO_LONG
	}

	// Files
	errors.files = (() => {
		let main
		let specific = []

		if (!files || files.length === 0) {
			// Empty field
			main = FORM_ERR.FILES_REQUIRED
		} else {
			// Too many files
			if (files.length > CONST.ATTACHMENTS_MAX_COUNT) {
				main = FORM_ERR.TOO_MANY_FILES
			}
			// Attachment too big
			files.forEach((file, i) => {
				if (file.data.size > CONST.ATTACHMENTS_MAX_SIZE) {
					specific[i] = FORM_ERR.FILE_TOO_BIG
				}
			})
		}
		let errObj = { main, specific }
		return errObj
	})()

	return errors
}
