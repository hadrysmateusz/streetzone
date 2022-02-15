import { useFormState } from "react-final-form"

import { ButtonContainer } from "../../components/Button"
import { FormSubmitButton } from "../../components/FinalFormFields"
import DisplayJSONButton from "../../components/DisplayJSONButton"

export const AdminFormButtons = () => {
  const { values } = useFormState()

  return (
    <ButtonContainer>
      <FormSubmitButton big text="Gotowe" />
      <DisplayJSONButton big values={values} />
    </ButtonContainer>
  )
}
