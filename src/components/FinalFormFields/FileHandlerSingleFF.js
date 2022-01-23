import { css } from "styled-components/macro"
import { Field } from "react-final-form"

import { FileHandlerSingle } from "../FileHandler"

import { Section } from "./Common.styles"

export const FileHandlerSingleFF = ({ label, name, info }) => (
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
              width: 280px;
              height: 280px;
              margin: 0 auto;
            `}
          />
        )
      }}
    </Field>
  </Section>
)
