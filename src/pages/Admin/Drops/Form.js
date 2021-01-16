import React from "react"
import { Prompt } from "react-router-dom"
import { Form } from "react-final-form"

import { LoaderButton, ButtonContainer } from "../../../components/Button"
import DisplayJSONButton from "../../../components/DisplayJSONButton"
import LoadingSpinner from "../../../components/LoadingSpinner"
import {
  TextFF,
  DropdownFF,
  FileHandlerFF,
  MultiTextInputFF,
  TextareaFF,
} from "../../../components/FinalFormFields"

import { dateFormat } from "../../../utils/formatting/formatDropData"
import { ITEM_SCHEMA } from "../../../constants"
import { useDesignerOptions } from "../../../hooks"

import { StyledForm } from "../Common"

export default ({ onSubmit, initialValues, edit }) => {
  const designerOptions = useDesignerOptions()

  return !initialValues && edit ? (
    <LoadingSpinner />
  ) : (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
        return (
          <StyledForm onSubmit={handleSubmit}>
            <Prompt
              when={Object.values(values).length > 0 && !pristine}
              message={(location) => "Zmiany nie zostały zapisane. Czy napewno chcesz wyjść?"}
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

            <TextFF
              label="Nakład przedmiotu"
              placeholder="np. 500 sztuk, Limitowany (opcjonalne)"
              name="howMany"
              info="Dokładna liczba lub opis"
            />

            <MultiTextInputFF
              label="Gdzie kupić?"
              placeholder="Linki (zatwierdzaj Enterem) (Opcjonalne)"
              name="buyAt"
            />

            <MultiTextInputFF label="Tagi" placeholder="Tagi (zatwierdzaj Enterem)" name="tags" />

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
        )
      }}
    />
  )
}
