import { Form } from "react-final-form"
import { Prompt } from "react-router-dom"

import LoadingSpinner from "../LoadingSpinner"
import { Button, LoaderButton, ButtonContainer } from "../Button"
import { UserImageFF, TextFF, TextareaFF } from "../FinalFormFields"
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
      render={({ form, handleSubmit, submitting, pristine, values }) => (
        <StyledForm onSubmit={handleSubmit}>
          <Prompt
            when={Object.values(values).length > 0 && !pristine}
            message={() => "Zmiany nie zostały zapisane. Czy napewno chcesz wyjść?"}
          />

          <Heading>Informacje i Zdjęcie profilowe</Heading>

          <TextFF name="name" label="Nazwa użytkownika" placeholder="Nazwa użytkownika" />

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

          <TextareaFF name="info" label="Opis" placeholder="Dodatkowe informacje" />

          <UserImageFF name="file" />

          <ButtonContainer centered>
            <LoaderButton
              text="Zapisz"
              type="submit"
              isLoading={submitting}
              disabled={submitting || pristine}
              primary
              fullWidth
            />
            <Button
              text="Anuluj"
              type="button"
              disabled={submitting || pristine}
              onClick={() => {
                form.reset()
                onCancel()
              }}
              fullWidth
            >
              Anuluj
            </Button>
          </ButtonContainer>
        </StyledForm>
      )}
    />
  )
