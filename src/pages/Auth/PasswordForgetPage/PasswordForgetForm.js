import { Form } from "react-final-form"

import { LoaderButton } from "../../../components/Button"
import { TextFF } from "../../../components/FinalFormFields"

import { useFirebase } from "../../../hooks"

import { StyledForm } from "./PasswordForgetPage.styles"
import validate from "./validate"

export const PasswordForgetForm = ({ onSuccess, onError }) => {
  const firebase = useFirebase()

  const onSubmit = async (values, form) => {
    const { email } = values

    try {
      await firebase.resetPassword(email)

      // Reset form
      setTimeout(form.reset)

      onSuccess()
    } catch (err) {
      onError(err)
    }
  }

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, submitting, pristine }) => (
        <StyledForm onSubmit={handleSubmit}>
          <TextFF label="E-mail" name="email" />

          <LoaderButton
            text="Zresetuj hasło"
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
}
