import { Form } from "react-final-form"
import { Prompt } from "react-router-dom"

import LoadingSpinner from "../LoadingSpinner"
import { Button, LoaderButton, ButtonContainer } from "../Button"
import { TextFF } from "../FinalFormFields"
import { StyledForm } from "../BasicStyledForm"

import { Heading } from "./Heading"

export const ChangeEmailForm = ({ onSubmit, initialValues, onCancel }) =>
  !initialValues ? (
    <LoadingSpinner />
  ) : (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => (
        <StyledForm onSubmit={handleSubmit}>
          <Prompt
            when={Object.values(values).length > 0 && !pristine}
            message={(location) => "Zmiany nie zostały zapisane. Czy napewno chcesz wyjść?"}
          />

          <Heading>Zmień adres email</Heading>

          <TextFF name="email" label="E-mail" placeholder="E-mail" info="Do kontaktu i logowania" />

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
