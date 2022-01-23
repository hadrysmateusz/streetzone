import { FORM_ERR } from "../../../constants"

const validate = ({ label, colorA, colorB }) => {
  const errors = {}

  if (!label) {
    errors.label = FORM_ERR.IS_REQUIRED
  }

  if (!colorA) {
    errors.colorA = FORM_ERR.IS_REQUIRED
  }

  if (!colorB) {
    errors.colorB = FORM_ERR.IS_REQUIRED
  }

  console.warn(errors)
  return errors
}

export default validate
