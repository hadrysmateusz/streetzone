import { FORM_ERR } from "../../../constants"

const validate = ({ password }) => {
  const errors = {}

  if (!password) {
    errors.password = FORM_ERR.IS_REQUIRED
  }

  return errors
}

export default validate
