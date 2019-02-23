import { FORM_ERR, CONST, REGEX } from "../../constants"

export default ({ name, email, city, phone, info }) => {
	const errors = {}

	// Name
	if (!name) {
		errors.name = FORM_ERR.IS_REQUIRED
	}

	// E-mail
	if (!email) {
		errors.email = FORM_ERR.IS_REQUIRED
	} else if (!REGEX.EMAIL.test(email)) {
		errors.email = FORM_ERR.EMAIL_INVALID
	}

	// Info
	if (info && info.length > CONST.ACCOUNT_DESC_MAX_CHARACTERS) {
		errors.info = FORM_ERR.ACCOUNT_DESC_TOO_LONG
	}

	return errors
}
