import { Form } from "react-final-form"

import { FormSubmitButton, TextFF } from "../../../components/FinalFormFields"
import { CONST } from "../../../constants"
import { useFirebase } from "../../../hooks"

import validate from "./validate"
import { StyledForm } from "./SignUpForm.styles"

const SignUpForm = ({ onSuccess, onError }) => {
  const firebase = useFirebase()

  const onSubmit = async (values, form) => {
    try {
      // Get values and attempt sign-up
      const { name, email, password } = values
      const authUser = await firebase.signUpWithEmail(email, password)

      // Add the name to the auth user
      await authUser.user.updateProfile({
        displayName: name,
      })

      // Create user in db
      const userId = authUser.user.uid

      // Upload the data to firebase
      await firebase.createUser({
        name,
        email,
        id: userId,
        profilePictureURLs: [],
        importedFrom: null,
      })

      // reset the form
      setTimeout(form.reset)

      // exit successfully
      onSuccess(`Witaj w ${CONST.BRAND_NAME}!`)
    } catch (err) {
      // pass the error to handler
      onError(err)
    }
  }

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          <TextFF label="Nazwa użytkownika" name="name" />

          <TextFF label="E-mail" name="email" />

          <TextFF label="Hasło" password name="password" />

          <TextFF label="Potwierdź hasło" password name="passwordConfirm" />

          <FormSubmitButton text="Gotowe" />
        </StyledForm>
      )}
    />
  )
}

export default SignUpForm
