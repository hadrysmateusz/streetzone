import { Field } from "react-final-form"

import { FileHandler } from "../FileHandler"

import { Section } from "./Common.styles"

export const FileHandlerFF = ({ label, name, info }) => (
  <Section>
    <div className="header">{label}</div>
    <Field name={name}>
      {({ input, meta }) => {
        const error = meta.error && meta.touched ? meta.error.main : null
        const itemErrors = meta.error ? meta.error.specific : null
        return <FileHandler {...input} error={error} itemErrors={itemErrors} info={info} />
      }}
    </Field>
  </Section>
)
