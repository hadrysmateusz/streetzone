import { Form } from "react-final-form"

import { TextFF, TextareaFF, UserImageFF } from "../../../components/FinalFormFields"
import { LoaderButton, ButtonContainer } from "../../../components/Button"
import LoadingSpinner from "../../../components/LoadingSpinner"

import { StyledForm } from "../Common"

import validate from "./Form.validate"

const AuthorsForm = ({ onSubmit, initialValues, edit }) =>
  !initialValues && edit ? (
    <LoadingSpinner />
  ) : (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, pristine }) => (
        <StyledForm onSubmit={handleSubmit}>
          <TextFF name="name" label="Imię / Pseudonim" placeholder="Imię / Pseudonim" />

          <TextareaFF
            name="about"
            label="O autorze (OPCJONALNE)"
            placeholder="Kilka informacji czy cuś"
          />

          <UserImageFF label="Zdjęcie (OPCJONALNE)" name="image" />

          <ButtonContainer centered>
            <LoaderButton
              text="Gotowe"
              type="submit"
              isLoading={submitting}
              disabled={submitting || pristine}
              primary
            />
          </ButtonContainer>
        </StyledForm>
      )}
    />
  )

export default AuthorsForm
