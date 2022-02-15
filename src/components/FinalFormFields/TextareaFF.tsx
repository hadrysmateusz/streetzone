import React from "react"

import { Textarea } from "../FormElements"

import { CommonFieldProps, CommonUnwrappedFieldProps } from "./types"
import { SimpleFFWrapper } from "./HelperComponents"
import { useFieldWithError } from "./Helpers"

type FieldValue = string
type TextareaFFBaseProps = { placeholder?: string }
type TextInputFFProps = CommonUnwrappedFieldProps & TextareaFFBaseProps
type TextInputFFWrappedProps = CommonFieldProps & TextareaFFBaseProps

export const TextareaFF: React.FC<TextInputFFWrappedProps> = ({
  label,
  ...rest
}) => {
  return (
    <SimpleFFWrapper label={label}>
      <TextareaFFUnwrapped {...rest} />
    </SimpleFFWrapper>
  )
}

export const TextareaFFUnwrapped: React.FC<TextInputFFProps> = ({
  name,
  info,
  placeholder,
}) => {
  const { input, error } = useFieldWithError<FieldValue, HTMLTextAreaElement>(
    name
  )

  return (
    <Textarea {...input} placeholder={placeholder} error={error} info={info} />
  )
}
