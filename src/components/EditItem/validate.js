import { FORM_ERR, CONST } from "../../constants"

export default (values) => {
	const { price, description, files } = values
	const errors = {}

	// Price
	if (!price) {
		errors.price = FORM_ERR.IS_REQUIRED
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
