import { FORM_ERR } from "../../../constants"

const validate = ({ name }) => {
  const errors = {}

  if (!name) {
    errors.name = FORM_ERR.IS_REQUIRED
  }

  // 'image' is optional
  // 'about' is optional

  console.warn(errors)
  return errors
}

export default validate
