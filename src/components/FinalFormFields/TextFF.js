import { Field } from "react-final-form"

import { Input } from "../FormElements"

import { Section } from "./Common.styles"

export const TextFF = ({ label, name, placeholder, info, password = false }) => (
  <Section>
    <div className="header">{label}</div>
    <Field name={name}>
      {({ input, meta }) => {
        const error = meta.error && meta.touched ? meta.error : null
        return (
          <Input
            {...input}
            type={password ? "password" : "text"}
            placeholder={placeholder}
            error={error}
            info={info}
          />
        )
      }}
    </Field>
  </Section>
)
