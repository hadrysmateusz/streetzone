import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import FormElementContainer from "./FormElementContainer"
import { IconContainer, InnerContainer, RightSlotContainer, StyledInput } from "./Input.styles"

const Input = React.forwardRef(
  ({ icon, info, error, disabled, rightSlot, rightSlotWidth, ...rest }, ref) => {
    const hasIcon = !!icon
    const hasRightSlot = !!rightSlot

    return (
      <FormElementContainer error={error} info={info}>
        <InnerContainer rightSlotWidth={rightSlotWidth}>
          {hasIcon && (
            <IconContainer isDisabled={disabled}>
              {icon && <FontAwesomeIcon icon={icon} />}
            </IconContainer>
          )}
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
