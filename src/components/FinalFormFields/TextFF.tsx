import React from "react"

import { Input } from "../FormElements"

import { SimpleFFWrapper } from "./HelperComponents"
import { CommonFieldProps, CommonUnwrappedFieldProps } from "./types"
import { useFieldWithError } from "./Helpers"

type FieldValue = string
type TextInputFFBaseProps = {
  placeholder?: string
  password?: boolean
}
type TextInputFFProps = CommonUnwrappedFieldProps & TextInputFFBaseProps
type TextInputFFWrappedProps = CommonFieldProps & TextInputFFBaseProps

export const TextFF: React.FC<TextInputFFWrappedProps> = ({
  label,
  ...rest
}) => (
  <SimpleFFWrapper label={label}>
    <TextInputFFUnwrapped {...rest} />
  </SimpleFFWrapper>
)

export const TextInputFFUnwrapped: React.FC<TextInputFFProps> = ({
  name,
  placeholder,
  info,
  password = false,
}) => {
  const { input, error } = useFieldWithError<FieldValue>(name)

  return (
    <Input
      {...input}
      type={password ? "password" : "text"}
      placeholder={placeholder}
      error={error}
      info={info}
    />
  )
}
