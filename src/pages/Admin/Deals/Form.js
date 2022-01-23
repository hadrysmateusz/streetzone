import { Prompt } from "react-router-dom"
import { Form } from "react-final-form"

import { TextFF, FileHandlerSingleFF, TextareaFF } from "../../../components/FinalFormFields"
import { LoaderButton, ButtonContainer } from "../../../components/Button"
import DisplayJSONButton from "../../../components/DisplayJSONButton"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { StyledForm } from "../../../components/BasicStyledForm"

const DealsForm = ({ onSubmit, initialValues, edit }) =>
  !initialValues && edit ? (
    <LoadingSpinner />
  ) : (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, pristine, values }) => (
        <StyledForm onSubmit={handleSubmit}>
          <Prompt
            when={Object.values(values).length > 0 && !pristine}
            message={() => "Zmiany nie zostały zapisane. Czy napewno chcesz wyjść?"}
          />

          <TextFF label="Tytuł" placeholder="Tytuł" name="title" />

          <TextareaFF label="Opis" placeholder="Gdzie, jak, ile itd." name="description" />

          <TextFF
            label="Wartość"
            placeholder="Cena lub przecena"
            name="value"
            info={'Razem z walutą lub znakami "-" i "%"'}
          />

          <TextFF
            label="Link"
            placeholder="Affiliate lub zwykły link do strony promocji"
            name="link"
          />

          <FileHandlerSingleFF label="Zdjęcie" name="file" />

          <ButtonContainer>
            <LoaderButton
              text="Gotowe"
              type="submit"
              big
              fullWidth
              primary
              isLoading={submitting}
              disabled={submitting || pristine}
            />
            <DisplayJSONButton big values={values} />
          </ButtonContainer>
        </StyledForm>
      )}
    />
  )

export default DealsForm
