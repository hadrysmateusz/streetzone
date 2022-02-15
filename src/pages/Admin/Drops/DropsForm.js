import { Form } from "react-final-form"
import arrayMutators from "final-form-arrays"
import { FieldArray } from "react-final-form-arrays"

import {
  DropdownFF,
  FileHandlerFF,
  TextareaFF,
  TextFF,
  TextInputFFUnwrapped,
  UnsavedChangesPrompt,
} from "../../../components/FinalFormFields"
import { Button, ButtonContainer } from "../../../components/Button"
import { StyledForm } from "../../../components/BasicStyledForm"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { ITEM_SCHEMA } from "../../../constants"
import { useDesignerOptions } from "../../../hooks"
import { dateFormat } from "../../../schema"

import { BuyAtGroup, Label } from "./DropsForm.styles"
import { AdminFormButtons } from "../AdminFormButtons"

const DropsForm = ({ onSubmit, initialValues, edit }) => {
  const designerOptions = useDesignerOptions()

  return !initialValues && edit ? (
    <LoadingSpinner />
  ) : (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      mutators={{
        ...arrayMutators,
      }}
      render={({
        form: {
          mutators: { push },
        },
        handleSubmit,
      }) => (
        <StyledForm onSubmit={handleSubmit}>
          <UnsavedChangesPrompt />

          <TextFF label="Nazwa przedmiotu" placeholder="Nazwa" name="name" />

          <TextareaFF
            label="Opis"
            placeholder="Kilka słów o przedmiocie. Jego historia itd. (Opcjonalny)"
            name="description"
          />

          {/* TODO: add input mask */}
          <TextFF
            label="Data i czas dropu"
            placeholder={dateFormat}
            name="dropsAtString"
            info={"Przestrzegaj formatu" + dateFormat}
          />

          <DropdownFF
            label="Projektanci przedmiotu"
            name="designers"
            placeholder="Projektanci / Marki"
            options={designerOptions}
            isClearable={true}
            isSearchable={true}
            isMulti={true}
            info="Jedna lub więcej w przypadku kolaboracji"
          />

          <DropdownFF
            label="Kategoria przedmiotu"
            name="itemCategory"
            options={ITEM_SCHEMA.categoryOptions}
            isSearchable={false}
            isMulti={false}
            placeholder="Kategoria"
          />

          <TextFF
            label="Cena przedmiotu"
            placeholder="Cena (opcjonalne)"
            name="price"
            info={"Razem z walutą"}
          />

          <div>
            <Label>Gdzie kupić?</Label>
            <FieldArray name="buyAt">
              {({ fields }) =>
                fields.map((name, index) => (
                  <div key={name}>
                    <Label>Link #{index + 1}</Label>
                    <BuyAtGroup>
                      <TextInputFFUnwrapped
                        name={`${name}.name`}
                        placeholder="Nazwa"
                        info="Nazwa sklepu/strony"
                      />
                      <TextInputFFUnwrapped
                        name={`${name}.link`}
                        placeholder="Link"
                        info="Link (affiliate lub zwykły)"
                      />
                      <Button danger onClick={() => fields.remove(index)}>
                        Usuń
                      </Button>
                    </BuyAtGroup>
                  </div>
                ))
              }
            </FieldArray>
            <ButtonContainer>
              <Button type="button" onClick={() => push("buyAt", undefined)}>
                Dodaj Link
              </Button>
            </ButtonContainer>
          </div>

          {/* <MultiTextInputFF
							label="Tagi"
							placeholder="Tagi (zatwierdzaj Enterem)"
							name="tags"
						/> */}

          <FileHandlerFF label="Zdjęcia" name="files" />

          <AdminFormButtons />
        </StyledForm>
      )}
    />
  )
}

export default DropsForm
