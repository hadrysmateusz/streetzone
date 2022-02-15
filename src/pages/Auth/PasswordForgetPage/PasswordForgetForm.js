import { Form } from "react-final-form"
import { FormSubmitButton, TextFF } from "../../../components/FinalFormFields"

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
      render={({ handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          <TextFF label="E-mail" name="email" />
          <FormSubmitButton text="Zresetuj hasło" />
        </StyledForm>
      )}
    />
  )
}
