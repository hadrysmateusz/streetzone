import { Form } from "react-final-form"

import { StyledForm } from "../../../components/BasicStyledForm"
import { FormSubmitButton, TextFF } from "../../../components/FinalFormFields"

import { CONST, FORM_ERR } from "../../../constants"

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

const SignInForm = ({ onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    render={({ handleSubmit }) => (
      <StyledForm onSubmit={handleSubmit}>
        <TextFF label="E-mail" name="email" />

        <TextFF label="Hasło" password name="password" />

        <FormSubmitButton text="Gotowe" />
      </StyledForm>
    )}
  />
)

export default SignInForm
