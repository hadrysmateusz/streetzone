import { Field } from "react-final-form"

import { LiveFileHandler } from "../FileHandler"

import { Section } from "./Common.styles"

export const LiveFileHandlerFF = ({ label, name, uploadPath, info }) => (
  <Section>
    <div className="header">{label}</div>
    <Field name={name}>
      {({ input, meta }) => {
        const error = meta.error && meta.touched ? meta.error : null
        return <LiveFileHandler {...input} uploadPath={uploadPath} error={error} info={info} />
      }}
    </Field>
  </Section>
)
