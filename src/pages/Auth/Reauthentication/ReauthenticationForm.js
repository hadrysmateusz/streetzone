import { Form } from "react-final-form"

import { FormSubmitButton, TextFF } from "../../../components/FinalFormFields"

import { StyledForm } from "./Reauthentication.styles"
import validate from "./validate"

const ReauthenticationForm = ({ onSubmit, onError }) => (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    render={({ handleSubmit }) => (
      <StyledForm onSubmit={handleSubmit}>
        <TextFF label="Hasło" password name="password" />
        <FormSubmitButton text="Gotowe" />
      </StyledForm>
    )}
  />
)

export default ReauthenticationForm
