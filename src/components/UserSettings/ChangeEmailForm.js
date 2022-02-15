import { Form } from "react-final-form"

import LoadingSpinner from "../LoadingSpinner"
import { ButtonContainer } from "../Button"
import {
  FormCancelButton,
  FormSubmitButton,
  TextFF,
  UnsavedChangesPrompt,
} from "../FinalFormFields"
import { StyledForm } from "../BasicStyledForm"

import { Heading } from "./Heading"

export const ChangeEmailForm = ({ onSubmit, initialValues, onCancel }) =>
  !initialValues ? (
    <LoadingSpinner />
  ) : (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, pristine }) => (
        <StyledForm onSubmit={handleSubmit}>
          <UnsavedChangesPrompt />

          <Heading>Zmień adres email</Heading>

          <TextFF
            name="email"
            label="E-mail"
            placeholder="E-mail"
            info="Do kontaktu i logowania"
          />

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
