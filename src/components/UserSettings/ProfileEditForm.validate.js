import { FORM_ERR } from "../../constants"

const validate = ({ name }) => {
  const errors = {}

  if (!name) {
    errors.name = FORM_ERR.IS_REQUIRED
  }

  return errors
}

export default validate
