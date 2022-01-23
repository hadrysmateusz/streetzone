import { FORM_ERR, CONST } from "../../../constants"

const validate = (values) => {
  const { password, passwordConfirm } = values
  const errors = {}

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

  return errors
}

export default validate
