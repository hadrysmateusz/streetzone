import { FORM_ERR, CONST } from "../../../constants"

const validate = ({ email }) => {
  const errors = {}

  if (!email) {
    errors.email = FORM_ERR.IS_REQUIRED
  } else if (!CONST.EMAIL_REGEX.test(email)) {
    errors.email = FORM_ERR.EMAIL_INVALID
  }

  return errors
}

export default validate
