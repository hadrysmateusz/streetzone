import { Form, Field } from "react-final-form"

import { LoaderButton, ButtonContainer } from "../../../components/Button"
import { FileHandlerSingle } from "../../../components/FileHandler"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { Input } from "../../../components/FormElements"

import validate from "./Form.validate"
import { FlexContainer, GradientSwatch, Swatch } from "./Form.styles"

const DesignersForm = ({ onSubmit, initialValues, edit }) =>
  !initialValues && edit ? (
    <LoadingSpinner />
  ) : (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, pristine, form, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field name="label">
              {({ input, meta }) => {
                const error = meta.error && meta.touched ? meta.error : null
                return <Input {...input} type="text" placeholder="Nazwa" error={error} />
              }}
            </Field>
            <Field name="colorA">
              {({ input, meta }) => {
                const error = meta.error && meta.touched ? meta.error : null
                return (
                  <FlexContainer>
                    <Input {...input} type="text" placeholder="Kolor A" error={error} />
                    <GradientSwatch color={input.value} />
                  </FlexContainer>
                )
              }}
            </Field>
            <Field name="colorB">
              {({ input, meta }) => {
                const error = meta.error && meta.touched ? meta.error : null
                return (
                  <FlexContainer>
                    <Input {...input} type="text" placeholder="Kolor B" error={error} />
                    <Swatch color={input.value} />
                  </FlexContainer>
                )
              }}
            </Field>

            <GradientSwatch colorA={values.colorA} colorB={values.colorB} />

            <Field name="logo">
              {({ input, meta }) => {
                return <FileHandlerSingle {...input} error={meta.error} variant="small-square" />
              }}
            </Field>

            <ButtonContainer centered>
              <LoaderButton
                text="Gotowe"
                type="submit"
                isLoading={submitting}
                disabled={submitting || pristine}
                primary
              />
            </ButtonContainer>
          </form>
        )
      }}
    />
  )

export default DesignersForm
