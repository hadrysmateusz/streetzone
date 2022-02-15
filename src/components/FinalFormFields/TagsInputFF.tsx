import React from "react"

import TagsInput, { FieldValue } from "../FormElements/TagsInput"

import { CommonFieldProps, CommonUnwrappedFieldProps } from "./types"
import { SimpleFFWrapper } from "./HelperComponents"
import { useFieldWithError } from "./Helpers"

type TagsInputFFBaseProps = {
  placeholder?: string
  isClearable?: boolean
}
type TagsInputFFProps = CommonUnwrappedFieldProps & TagsInputFFBaseProps
type TagsInputFFWrappedProps = CommonFieldProps & TagsInputFFBaseProps

export const TagsInputFF: React.FC<TagsInputFFWrappedProps> = ({
  label,
  ...rest
}) => {
  return (
    <SimpleFFWrapper label={label}>
      <TagsInputFFUnwrapped {...rest} />
    </SimpleFFWrapper>
  )
}

export const TagsInputFFUnwrapped: React.FC<TagsInputFFProps> = ({
  name,
  info,

  placeholder,
  isClearable = false,
}) => {
  const { input, error } = useFieldWithError<FieldValue>(name)

  return (
    <TagsInput
      {...input}
      placeholder={placeholder}
      error={error}
      info={info}
      isClearable={isClearable}
    />
  )
}
