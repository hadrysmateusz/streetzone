import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import FormElementContainer from "./HelperComponents/FormElementContainer"
import {
  IconContainer,
  InnerContainer,
  RightSlotContainer,
  StyledInput,
} from "./Input.styles"
import { IconProp } from "@fortawesome/fontawesome-svg-core"

export type NumberInputProps = {
  step?: number
  min?: number
  max?: number
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  info?: string
  error?: string

  icon?: IconProp
  rightSlot?: React.ReactNode
  rightSlotWidth?: string
} & Partial<NumberInputProps>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { icon, info, error, disabled = false, rightSlot, rightSlotWidth, ...rest },
    ref
  ) => {
    const hasIcon = !!icon
    const hasRightSlot = !!rightSlot

    return (
      <FormElementContainer error={error} info={info}>
        <InnerContainer rightSlotWidth={rightSlotWidth}>
          {hasIcon ? (
            <IconContainer isDisabled={disabled}>
              {icon ? <FontAwesomeIcon icon={icon} /> : null}
            </IconContainer>
          ) : null}
          <StyledInput
            ref={ref}
            hasIcon={hasIcon}
            hasRightSlot={hasRightSlot}
            hasError={!!error}
            disabled={disabled}
            {...rest}
          />
          {hasRightSlot && <RightSlotContainer>{rightSlot}</RightSlotContainer>}
        </InnerContainer>
      </FormElementContainer>
    )
  }
)

export default Input
