import { useField } from "react-final-form"

import { FileHandler } from "../../FileHandler"
import { SimpleFFWrapper } from "../HelperComponents"

export const FileHandlerFF = ({ label, ...rest }) => {
  return (
    <SimpleFFWrapper label={label}>
      <FileHandlerFFUnwrapped {...rest} />
    </SimpleFFWrapper>
  )
}

export const FileHandlerFFUnwrapped = ({ name, info }) => {
  const { meta, input } = useField(name)

  const mainError = meta.error && meta.touched ? meta.error.main : null
  const itemErrors = meta.error ? meta.error.specific : null

  return (
    <FileHandler
      {...input}
      error={mainError}
      itemErrors={itemErrors}
      info={info}
    />
  )
}
