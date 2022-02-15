import { Field, Form } from "react-final-form"

import { ButtonContainer } from "../../../components/Button"
import { FileHandlerSingle } from "../../../components/FileHandler"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { Input } from "../../../components/FormElements"

import validate from "./Form.validate"
import { FlexContainer, GradientSwatch, Swatch } from "./Form.styles"
import {
  FormSubmitButton,
  getFormError,
} from "../../../components/FinalFormFields"

const DesignersForm = ({ onSubmit, initialValues, edit }) =>
  !initialValues && edit ? (
    <LoadingSpinner />
  ) : (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field name="label">
              {({ input, meta }) => (
                <Input
                  {...input}
                  type="text"
                  placeholder="Nazwa"
                  error={getFormError(meta)}
                />
              )}
            </Field>
            <Field name="colorA">
              {({ input, meta }) => (
                <FlexContainer>
                  <Input
                    {...input}
                    type="text"
                    placeholder="Kolor A"
                    error={getFormError(meta)}
                  />
                  <GradientSwatch color={input.value} />
                </FlexContainer>
              )}
            </Field>
            <Field name="colorB">
              {({ input, meta }) => (
                <FlexContainer>
                  <Input
                    {...input}
                    type="text"
                    placeholder="Kolor B"
                    error={getFormError(meta)}
                  />
                  <Swatch color={input.value} />
                </FlexContainer>
              )}
            </Field>

            <GradientSwatch colorA={values.colorA} colorB={values.colorB} />

            <Field name="logo">
              {({ input, meta }) => (
                <FileHandlerSingle
                  {...input}
                  error={meta.error}
                  variant="small-square"
                />
              )}
            </Field>

            <ButtonContainer centered>
              <FormSubmitButton text="Gotowe" fullWidth={false} />
            </ButtonContainer>
          </form>
        )
      }}
    />
  )

export default DesignersForm
