import { Field } from "react-final-form"

import TagsInput from "../FormElements/TagsInput"

import { Section } from "./Common.styles"

export const TagsInputFF = ({ label, name, placeholder, isClearable, info }) => (
  <Section>
    <div className="header">{label}</div>
    <Field name={name} type="select">
      {({ input, meta }) => {
        const error = meta.error && meta.touched ? meta.error : null
        return (
          <TagsInput
            {...input}
            placeholder={placeholder}
            error={error}
            isClearable={isClearable}
            info={info}
          />
        )
      }}
    </Field>
  </Section>
)
