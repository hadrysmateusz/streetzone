import React from "react"
import { Form, Field } from "react-final-form"
import { OnChange } from "react-final-form-listeners"
import styled from "styled-components/macro"
import { withRouter } from "react-router-dom"

import { LoaderButton, ButtonContainer } from "../../components/Button"
import DropdownFinalform from "../../components/DropdownFinalform"
import InfoBox from "../../components/InfoBox"
import { Input, Textarea } from "../../components/FormElements"
import { TextBlock } from "../../components/StyledComponents"
import { FileHandler } from "../../components/FileHandler"
import { StyledLink } from "../../components/Basics"

import validate from "./validate"

import { ITEM_SCHEMA, ROUTES, CONST } from "../../constants"
import { useDesignerOptions } from "../../hooks"
import { CONTACT_EMAIL } from "../../constants/const"

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing2);
  @media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
    gap: var(--spacing3);
  }
`

const FormElement = styled.div`
  grid-column: span 2;
  @media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
    ${(p) => p.small && "grid-column: span 1;"}
  }
`

const NewItemForm = ({ onSubmit, history }) => {
  const designerOptions = useDesignerOptions()

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
        return (
          <StyledForm onSubmit={handleSubmit}>
            <TextBlock size="m" bold uppercase>
              Informacje
            </TextBlock>

            {/* Name */}
            <FormElement>
              <Field name="name">
                {({ input, meta }) => {
                  const error = meta.error && meta.touched ? meta.error : null
                  return <Input {...input} type="text" placeholder="Nazwa" error={error} />
                }}
              </Field>
            </FormElement>

            {/* Designers */}
            <FormElement>
              <Field name="designers" type="select">
                {({ input, meta }) => {
                  const error = meta.error && meta.touched ? meta.error : null
                  return (
                    <DropdownFinalform
                      {...input}
                      options={designerOptions}
                      isClearable={true}
                      isSearchable={true}
                      isMulti={true}
                      placeholder="Projektanci / Marki"
                      error={error}
                      info="Możesz wybrać więcej niż jedną markę w przypadku kolaboracji"
                    />
                  )
                }}
              </Field>
            </FormElement>

            <InfoBox span={2}>
              <TextBlock>
                Jeśli nie znalazłeś marki której potrzebujesz napisz do nas na{" "}
                <b>{CONTACT_EMAIL}</b> lub użyj formularza dostępnego{" "}
                <StyledLink to={ROUTES.REQUEST_DESIGNER}>tutaj</StyledLink>.
              </TextBlock>
            </InfoBox>

            {/* Category */}
            <FormElement small>
              <Field name="category" type="select">
                {({ input, meta }) => {
                  const error = meta.error && meta.touched ? meta.error : null
                  return (
                    <DropdownFinalform
                      {...input}
                      options={ITEM_SCHEMA.categoryOptions}
                      isSearchable={false}
                      placeholder="Kategoria"
                      error={error}
                    />
                  )
                }}
              </Field>
            </FormElement>

            {/* Size */}
            <FormElement small>
              <Field name="size">
                {({ input, meta }) => {
                  const error = meta.error && meta.touched ? meta.error : null
                  const options = ITEM_SCHEMA.sizeOptions(values.category)

                  return (
                    <>
                      <OnChange name="category">
                        {(value, previous) => {
                          if (value !== previous) {
                            // prevent leaving focus on a disabled field
                            form.blur("size")
                            // reset the field
                            input.onChange(undefined)
                          }
                        }}
                      </OnChange>
                      <DropdownFinalform
                        {...input}
                        options={options}
                        isSearchable={false}
                        disabled={
                          !values.category || values.category === ITEM_SCHEMA.categories.akcesoria
                        }
                        placeholder="Rozmiar"
                        error={error}
                        info="Dostępne rozmiary zależne są od wybranej kategorii"
                      />
                    </>
                  )
                }}
              </Field>
            </FormElement>

            {/* Price */}
            <FormElement small>
              <Field name="price">
                {({ input, meta }) => {
                  const error = meta.error && meta.touched ? meta.error : null
                  return (
                    <Input
                      {...input}
                      type="number"
                      min="0"
                      step="1"
                      placeholder="Cena"
                      error={error}
                    />
                  )
                }}
              </Field>
            </FormElement>

            {/* Condition */}
            <FormElement small>
              <Field name="condition">
                {({ input, meta }) => {
                  const error = meta.error && meta.touched ? meta.error : null
                  return (
                    <DropdownFinalform
                      {...input}
                      options={ITEM_SCHEMA.conditionOptions}
                      isSearchable={false}
                      placeholder="Stan"
                      error={error}
                      info="Więcej informacji poniżej"
                    />
                  )
                }}
              </Field>
            </FormElement>

            <InfoBox columns={2} span={2}>
              <TextBlock>
                <b>DS (Deadstock)</b> - Przedmiot nowy, oryginalnie zapakowany.
              </TextBlock>
              <TextBlock>
                <b>VNDS (Very Near Deadstock)</b> - Przedmiot nowy, bez śladów użytkowania.
              </TextBlock>
            </InfoBox>

            <TextBlock size="m" bold uppercase>
              Opis
            </TextBlock>

            {/* Description */}
            <FormElement>
              <Field name="description">
                {({ input, meta }) => {
                  const error = meta.error && meta.touched ? meta.error : null
                  return (
                    <Textarea {...input} placeholder={CONST.ITEM_DESC_PLACEHOLDER} error={error} />
                  )
                }}
              </Field>
            </FormElement>

            <TextBlock size="m" bold uppercase>
              Zdjęcia
            </TextBlock>

            {/* Files (handled by separate component) */}

            <InfoBox span={2}>
              <TextBlock>
                Co najmniej na jednym zdjęciu powinna znajdować się kartka z twoją nazwą
                użytkownika. Zdjęcie główne zostanie miniaturą widoczną m.in. na stronie głównej.
              </TextBlock>
            </InfoBox>

            <FormElement>
              <Field name="files">
                {({ input, meta }) => {
                  const error = meta.error && meta.touched ? meta.error.main : null
                  const itemErrors = meta.error ? meta.error.specific : null
                  return <FileHandler {...input} error={error} itemErrors={itemErrors} />
                }}
              </Field>
            </FormElement>

            <FormElement>
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
              </ButtonContainer>
            </FormElement>
          </StyledForm>
        )
      }}
    />
  )
}

export default withRouter(NewItemForm)
