import { Form } from "react-final-form"
import { StyledForm } from "../../BasicStyledForm"

import { ButtonContainer } from "../../Button"

import {
  FormCancelButton,
  FormSubmitButton,
  TextFF,
} from "../../FinalFormFields"

import validate from "./PasswordForm.validate"

const PasswordForm = ({ onSubmit, onCancel }) => (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    render={({ handleSubmit, submitting, pristine }) => (
      <StyledForm onSubmit={handleSubmit}>
        <TextFF name="password" placeholder="Hasło" password />
        <TextFF name="passwordConfirm" placeholder="Potwierdź hasło" password />

        <ButtonContainer centered>
          <FormSubmitButton text="Zapisz" />
          <FormCancelButton
            text="Anuluj"
            disabled={(submitting || pristine) ?? undefined}
            onCancel={({ form }) => {
              form.reset()
              onCancel()
            }}
          />
        </ButtonContainer>
      </StyledForm>
    )}
  />
)

export default PasswordForm
