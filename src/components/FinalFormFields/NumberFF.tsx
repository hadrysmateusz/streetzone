import React from "react"

import { Input } from "../FormElements"

import { CommonFieldProps, CommonUnwrappedFieldProps } from "./types"
import { NumberInputProps } from "../FormElements/Input"
import { SimpleFFWrapper } from "./HelperComponents"
import { useFieldWithError } from "./Helpers"

type FieldValue = number
type NumberFFBaseProps = {
  placeholder?: string
} & NumberInputProps
type NumberFFProps = CommonUnwrappedFieldProps & NumberFFBaseProps
type NumberFFWrappedProps = CommonFieldProps & NumberFFBaseProps

export const NumberFF: React.FC<NumberFFWrappedProps> = ({
  label,
  ...rest
}) => {
  return (
    <SimpleFFWrapper label={label}>
      <NumberFFUnwrapped {...rest} />
    </SimpleFFWrapper>
  )
}

export const NumberFFUnwrapped: React.FC<NumberFFProps> = ({
  name,
  step,
  min,
  max,
  placeholder,
  info,
}) => {
  const { input, error } = useFieldWithError<FieldValue>(name)

  return (
    <Input
      {...input}
      type={"number"}
      error={error}
      step={step}
      min={min}
      max={max}
      info={info}
      placeholder={placeholder}
    />
  )
}
