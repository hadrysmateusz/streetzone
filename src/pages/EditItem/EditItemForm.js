import { Form } from "react-final-form"

import {
  DropdownFF,
  FileHandlerFF,
  FormCancelButton,
  FormSubmitButton,
  NumberFF,
  TextareaFF,
  UnsavedChangesPrompt,
} from "../../components/FinalFormFields"
import { ButtonContainer } from "../../components/Button"
import LoadingSpinner from "../../components/LoadingSpinner"
import { StyledForm } from "../../components/BasicStyledForm"

import { CONST, ITEM_SCHEMA } from "../../constants"

import validate from "./validate"

const EditItemForm = ({ onSubmit, initialValues }) =>
  !initialValues ? (
    <LoadingSpinner />
  ) : (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      render={({ handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          <UnsavedChangesPrompt
            when={({ formState }) => {
              if (!(formState?.values)) return false
              return (
                Object.values(formState.values).length > 0 &&
                formState.dirty &&
                !formState.submitting
              )
            }}
          />

          <NumberFF
            label="Cena"
            placeholder="Cena"
            name="price"
            min="0"
            step="1"
          />

          <DropdownFF
            label="Stan"
            placeholder="Stan"
            name="condition"
            options={ITEM_SCHEMA.conditionOptions}
            isSearchable={false}
            isMulti={false}
          />

          <TextareaFF
            label="Opis"
            placeholder={CONST.ITEM_DESC_PLACEHOLDER}
            name="description"
          />

          <FileHandlerFF label="Zdjęcia" name="files" />

          <ButtonContainer>
            <FormSubmitButton text="Gotowe" />
            <FormCancelButton text="Anuluj" />
          </ButtonContainer>
        </StyledForm>
      )}
    />
  )

export default EditItemForm
