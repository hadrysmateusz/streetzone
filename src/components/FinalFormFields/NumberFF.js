import { Field } from "react-final-form"

import { Input } from "../FormElements"

import { Section } from "./Common.styles"

export const NumberFF = ({ label, name, step, min, max, placeholder, info }) => (
  <Section>
    <div className="header">{label}</div>
    <Field name={name}>
      {({ input, meta }) => {
        const error = meta.error && meta.touched ? meta.error : null
        return (
          <Input
            {...input}
            type="number"
            placeholder={placeholder}
            error={error}
            step={step}
            min={min}
            max={max}
            info={info}
          />
        )
      }}
    </Field>
  </Section>
)
