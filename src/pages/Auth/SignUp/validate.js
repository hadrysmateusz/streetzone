import { FORM_ERR, CONST } from "../../../constants"

const validate = (values) => {
  const { email, name, password, passwordConfirm } = values
  const errors = {}

  // E-mail
  if (!email) {
    errors.email = FORM_ERR.IS_REQUIRED
  } else if (!CONST.EMAIL_REGEX.test(email)) {
    errors.email = FORM_ERR.EMAIL_INVALID
  }

  // Name
  if (!name) {
    errors.name = FORM_ERR.IS_REQUIRED
  }

  // Password
  if (!password) {
    errors.password = FORM_ERR.IS_REQUIRED
  } else if (password.length < CONST.MIN_PASSWORD_LENGTH) {
    errors.password = FORM_ERR.PASSWORD_TOO_SHORT
  }

  // Password Confirm
  if (!passwordConfirm) {
    errors.passwordConfirm = FORM_ERR.IS_REQUIRED
  } else if (password !== passwordConfirm) {
    errors.passwordConfirm = FORM_ERR.PASSWORDS_NOT_MATCHING
  }

  console.warn(errors)

  return errors
}

export default validate
