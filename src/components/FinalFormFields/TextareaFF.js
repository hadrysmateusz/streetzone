import { Field } from "react-final-form"

import { Textarea } from "../FormElements"

import { Section } from "./Common.styles"

export const TextareaFF = ({ label, name, placeholder, info }) => (
  <Section>
    <div className="header">{label}</div>
    <Field name={name}>
      {({ input, meta }) => {
        const error = meta.error && meta.touched ? meta.error : null
        return <Textarea {...input} placeholder={placeholder} error={error} info={info} />
      }}
    </Field>
  </Section>
)
