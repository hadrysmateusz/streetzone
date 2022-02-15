import React from "react"
import { FieldInputProps } from "react-final-form"

import FormElementContainer from "./HelperComponents/FormElementContainer"
import { StyledTextarea } from "./Textarea.styles"

interface ResizableTextareaProps
  extends FieldInputProps<string, HTMLTextAreaElement> {
  info?: string
  error?: string
  placeholder?: string
  disabled?: boolean
  autoResize?: boolean
  numberOfLines?: number
}

const Textarea: React.FC<ResizableTextareaProps> = ({
  info,
  error,
  disabled = false,
  numberOfLines = 4,
  placeholder,
  autoResize = true,
  ...rest
}) => (
  <FormElementContainer error={error} info={info}>
    <StyledTextarea
      disabled={disabled}
      numberOfLines={numberOfLines}
      hasError={!!error}
      autoResize={autoResize}
      placeholder={placeholder}
      {...rest}
    />
  </FormElementContainer>
)

export default Textarea
