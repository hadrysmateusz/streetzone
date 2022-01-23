import { FORM_ERR } from "../../constants"

const validate = ({ name }) => {
  let errors = {}

  if (!name) {
    errors.name = FORM_ERR.IS_REQUIRED
  } else {
    name = name.trim()
    if (name.length === 0) {
      errors.name = FORM_ERR.IS_REQUIRED
    }
  }

  return errors
}

export default validate
