import { Form } from "react-final-form"

import { TextFF } from "../../../components/FinalFormFields"
import { LoaderButton } from "../../../components/Button"

import { StyledForm } from "./Reauthentication.styles"
import validate from "./validate"

const ReauthenticationForm = ({ onSubmit, onError }) => (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    render={({ handleSubmit, submitting, pristine }) => (
      <StyledForm onSubmit={handleSubmit}>
        <TextFF label="Hasło" password name="password" />

        <LoaderButton
          text="Gotowe"
          type="submit"
          fullWidth
          primary
          isLoading={submitting}
          disabled={submitting || pristine}
        />
      </StyledForm>
    )}
  />
)

export default ReauthenticationForm
