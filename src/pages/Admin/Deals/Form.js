import { Form } from "react-final-form"

import {
  FileHandlerSingleFF,
  TextareaFF,
  TextFF,
  UnsavedChangesPrompt,
} from "../../../components/FinalFormFields"
import { StyledForm } from "../../../components/BasicStyledForm"

import { FormWrapper } from "../FormWrapper"
import { AdminFormButtons } from "../AdminFormButtons"

const DealsForm = ({ onSubmit, initialValues, edit }) => (
  <FormWrapper edit={edit} initialValues={initialValues}>
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          <UnsavedChangesPrompt />

          <TextFF label="Tytuł" placeholder="Tytuł" name="title" />

          <TextareaFF
            label="Opis"
            placeholder="Gdzie, jak, ile itd."
            name="description"
          />

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

          <AdminFormButtons />
        </StyledForm>
      )}
    />
  </FormWrapper>
)

export default DealsForm
