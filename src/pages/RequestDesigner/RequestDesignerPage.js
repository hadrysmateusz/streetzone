import { withRouter } from "react-router-dom"
import { Form } from "react-final-form"
import { nanoid } from "nanoid"

import { BackButton, ButtonContainer } from "../../components/Button"
import { PageContainer } from "../../components/Containers"
import {
  FormCancelButton,
  FormSubmitButton,
  TextFF,
} from "../../components/FinalFormFields"
import PageHeading from "../../components/PageHeading"
import HelmetBasics from "../../components/HelmetBasics"
import { useAuthentication, useFirebase, useFlash } from "../../hooks"

import validate from "./validate"
import { Info, StyledForm } from "./RequestDesignerPage.styles"

const RequestDesigner = ({ history }) => {
  const firebase = useFirebase()
  const authUser = useAuthentication()
  const flashMessage = useFlash()

  const onSubmit = async (values, form) => {
    const id = nanoid()

    let payload = {
      name: values.name,
      user: authUser ? authUser.uid : null,
      requestedAt: Date.now(),
      id,
    }

    try {
      // Add drop to database
      await firebase.db.collection("requestedDesigners").doc(id).set(payload)
    } catch (e) {
      flashMessage({
        type: "error",
        text: "Wystąpił problem",
        details: "Prośba nie została wysłana",
      })
      return
    }

    setTimeout(() => {
      flashMessage({
        type: "success",
        text: "Wysłano prośbę o dodanie",
        details:
          "Włącz powiadomienia, a my damy ci znać gdy marka zostanie dodana",
        ttl: 6000,
      })
      form.reset()
      history.goBack()
    })
  }

  return (
    <PageContainer>
      <HelmetBasics title="Dodaj projektanta / markę" />
      <PageHeading emoji={"🏷️"}>Dodaj projektanta / markę</PageHeading>

      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Info>
              {/* TODO: make this copy more accurate once all of the functionality is finished */}
              Podaj nazwę marki lub projektanta. Po weryfikacji, dodamy ją do
              systemu. W międzyczasie możesz użyć marki "Inny" by wystawić swój
              przedmiot. Gdy marka zostanie dodana, będziesz mógł zedytować
              swoje ogłoszenie.
            </Info>

            <TextFF
              label="Nazwa projektanta / marki"
              placeholder="Nazwa"
              name="name"
            />

            <ButtonContainer vertical>
              <FormSubmitButton text="OK" big fullWidth={false} />
              <BackButton />
              <FormCancelButton
                text="Wróć"
                fullWidth={false}
                onCancel={({ history }) => history.goBack()}
              />
            </ButtonContainer>
          </StyledForm>
        )}
      />
    </PageContainer>
  )
}

export default withRouter(RequestDesigner)
