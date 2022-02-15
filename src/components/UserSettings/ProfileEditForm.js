import { Form } from "react-final-form"

import LoadingSpinner from "../LoadingSpinner"
import { ButtonContainer } from "../Button"
import {
  FormCancelButton,
  FormSubmitButton,
  TextareaFF,
  TextFF,
  UserImageFF,
  UnsavedChangesPrompt
} from "../FinalFormFields"
import { StyledForm } from "../BasicStyledForm"

import { Heading } from "./Heading"
import validate from "./ProfileEditForm.validate"

export const ProfileEditForm = ({ onSubmit, initialValues, onCancel }) =>
  !initialValues ? (
    <LoadingSpinner />
  ) : (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, pristine }) => (
        <StyledForm onSubmit={handleSubmit}>
          <UnsavedChangesPrompt />

          <Heading>Informacje i Zdjęcie profilowe</Heading>

          <TextFF
            name="name"
            label="Nazwa użytkownika"
            placeholder="Nazwa użytkownika"
          />

          <TextFF name="city" label="Miasto" placeholder="Miasto" />

          <TextFF
            name="messengerLink"
            label="Link do twojego messengera"
            placeholder="Link do twojego messengera"
            info="Na przykład: m.me/john.doe.420"
          />

          <TextFF
            name="phone"
            label="Numer telefonu"
            placeholder="Numer telefonu"
            info="Do kontaktu"
          />

          <TextareaFF
            name="info"
            label="Opis"
            placeholder="Dodatkowe informacje"
          />

          <UserImageFF name="file" />

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
