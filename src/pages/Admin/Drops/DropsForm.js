import { Prompt } from "react-router-dom"
import { Form, Field } from "react-final-form"
import arrayMutators from "final-form-arrays"
import { FieldArray } from "react-final-form-arrays"

import { TextFF, DropdownFF, FileHandlerFF, TextareaFF } from "../../../components/FinalFormFields"
import { LoaderButton, ButtonContainer, Button } from "../../../components/Button"
import DisplayJSONButton from "../../../components/DisplayJSONButton"
import { StyledForm } from "../../../components/BasicStyledForm"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { Input } from "../../../components/FormElements"
import { ITEM_SCHEMA } from "../../../constants"
import { useDesignerOptions } from "../../../hooks"
import {dateFormat} from "../../../schema";

import { BuyAtGroup, Label } from "./DropsForm.styles"

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
        submitting,
        pristine,
        values,
      }) => (
        <StyledForm onSubmit={handleSubmit}>
          <Prompt
            when={Object.values(values).length > 0 && !pristine}
            message={(_location) => "Zmiany nie zostały zapisane. Czy napewno chcesz wyjść?"}
          />

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
                      <Field name={`${name}.name`}>
                        {({ input, meta }) => {
                          const error = meta.error && meta.touched ? meta.error : null
                          return (
                            <Input
                              {...input}
                              type="text"
                              placeholder="Nazwa"
                              error={error}
                              info="Nazwa sklepu/strony"
                            />
                          )
                        }}
                      </Field>
                      <Field name={`${name}.link`}>
                        {({ input, meta }) => {
                          const error = meta.error && meta.touched ? meta.error : null
                          return (
                            <Input
                              {...input}
                              type="text"
                              placeholder="Link"
                              error={error}
                              info="Link (affiliate lub zwykły)"
                            />
                          )
                        }}
                      </Field>
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
}

export default DropsForm
