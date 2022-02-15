import { Form } from "react-final-form"

import {
  FormSubmitButton,
  TextareaFF,
  TextFF,
  UserImageFF,
} from "../../../components/FinalFormFields"
import { ButtonContainer } from "../../../components/Button"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { StyledForm } from "../../../components/BasicStyledForm"

import validate from "./Form.validate"

const AuthorsForm = ({ onSubmit, initialValues, edit }) =>
  !initialValues && edit ? (
    <LoadingSpinner />
  ) : (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          <TextFF
            name="name"
            label="Imię / Pseudonim"
            placeholder="Imię / Pseudonim"
          />

          <TextareaFF
            name="about"
            label="O autorze (OPCJONALNE)"
            placeholder="Kilka informacji czy cuś"
          />

          <UserImageFF label="Zdjęcie (OPCJONALNE)" name="image" />

          <ButtonContainer centered>
            <FormSubmitButton text="Gotowe" fullWidth={false} />
          </ButtonContainer>
        </StyledForm>
      )}
    />
  )

export default AuthorsForm
