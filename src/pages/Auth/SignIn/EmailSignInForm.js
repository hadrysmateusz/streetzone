import { Form } from "react-final-form"

import { StyledForm } from "../../../components/BasicStyledForm"
import { TextFF } from "../../../components/FinalFormFields"
import { LoaderButton } from "../../../components/Button"

import { FORM_ERR, CONST } from "../../../constants"

const validate = (values) => {
  const { email, password } = values
  const errors = {}

  // E-mail
  if (!email) {
    errors.email = FORM_ERR.IS_REQUIRED
  } else if (!CONST.EMAIL_REGEX.test(email)) {
    errors.email = FORM_ERR.EMAIL_INVALID
  }

  // Password
  if (!password) {
    errors.password = FORM_ERR.IS_REQUIRED
  }

  return errors
}

const SignInForm = ({ onSubmit, onError }) => (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => (
      <StyledForm onSubmit={handleSubmit}>
        <TextFF label="E-mail" name="email" />

        <TextFF label="Hasło" password name="password" />

        <LoaderButton
          text="Gotowe"
          type="submit"
          fullWidth
          primary
          isLoading={submitting}
          disabled={submitting || pristine}
        />
      </StyledForm>
    )}
  />
)

export default SignInForm
