import React from "react"
import FormElementContainer from "./FormElementContainer"
import { StyledTextarea } from "./Textarea.styles"

interface TextareaProps {
  info: string
  error: string
  disabled: boolean
  autoResize: boolean
  numberOfLines: number
}

const Textarea: React.FC<TextareaProps> = ({
  info,
  error,
  disabled,
  autoResize = true,
  numberOfLines = 4,
  ...rest
}) => (
  <FormElementContainer error={error} info={info}>
    <StyledTextarea
      disabled={disabled}
      numberOfLines={numberOfLines}
      hasError={!!error}
      autoResize={autoResize}
      {...rest}
    />
  </FormElementContainer>
)

export default Textarea
