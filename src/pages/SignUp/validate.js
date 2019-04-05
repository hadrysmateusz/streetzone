import { FORM_ERR, REGEX } from "../../constants"

export default (values) => {
	const { email, name, password, passwordConfirm } = values
	const errors = {}

	// E-mail
	if (!email) {
		errors.email = FORM_ERR.IS_REQUIRED
	} else if (!REGEX.EMAIL.test(email)) {
		errors.email = FORM_ERR.EMAIL_INVALID
	}

	// Name
	if (!name) {
		errors.name = FORM_ERR.IS_REQUIRED
	}

	// Password
	if (!password) {
		errors.password = FORM_ERR.IS_REQUIRED
	}

	// Password Confirm
	if (!passwordConfirm) {
		errors.passwordConfirm = FORM_ERR.IS_REQUIRED
	} else if (password !== passwordConfirm) {
		errors.passwordConfirm = FORM_ERR.PASSWORDS_NOT_MATCHING
	}

	return errors
}
