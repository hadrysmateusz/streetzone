import { css } from "styled-components/macro"
import { Field } from "react-final-form"

import { FileHandlerSingle } from "../FileHandler"

import { Section } from "./Common.styles"

export const UserImageFF = ({ label, name, info }) => (
  <Section>
    <div className="header">{label}</div>
    <Field name={name}>
      {({ input, meta }) => {
        const error = meta.error && meta.touched ? meta.error : null
        return (
          <FileHandlerSingle
            {...input}
            error={error}
            info={info}
            containerStyles={css`
              width: 220px;
              height: 220px;
              border-radius: 50%;
              margin: 0 auto;
            `}
          />
        )
      }}
    </Field>
  </Section>
)
