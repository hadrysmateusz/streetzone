import { Field } from "react-final-form"

import MultiTextInputFinalform from "../MultiTextInputFinalform"

import { Section } from "./Common.styles"

export const MultiTextInputFF = ({ label, name, placeholder, info }) => (
  <Section>
    <div className="header">{label}</div>
    <Field name={name} type="select">
      {({ input, meta }) => {
        const error = meta.error && meta.touched ? meta.error : null
        return (
          <MultiTextInputFinalform {...input} placeholder={placeholder} error={error} info={info} />
        )
      }}
    </Field>
  </Section>
)
