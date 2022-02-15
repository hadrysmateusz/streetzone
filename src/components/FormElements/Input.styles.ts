import styled from "styled-components/macro"

import commonStyles, { BasicStylesProps } from "./Common.styles"

export const StyledInput = styled.input<
  {
    hasRightSlot?: boolean
    hasIcon?: boolean
  } & BasicStylesProps
>`
  /* only show arrows on hover in firefox */

  &[type="number"] {
    -moz-appearance: textfield;
  }

  &[type="number"]:hover,
  &[type="number"]:focus {
    -moz-appearance: number-input;
  }

  font-size: var(--font-size--s) !important;
  height: var(--form-element-height);
  padding: 0 var(--spacing2);
  ${(p) => p.hasIcon && "padding-left: var(--form-element-height);"}
  ${(p) => p.hasRightSlot && "padding-right: var(--right-slot-width);"}

  ${(p) => commonStyles(p)}
`

export const InnerContainer = styled.div<{ rightSlotWidth?: string }>`
  position: relative;
  --right-slot-width: ${(p) => p.rightSlotWidth || "0"};
`

export const IconContainer = styled.div<{ isDisabled?: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: var(--form-element-height);
  width: var(--form-element-height);
  display: flex;
  align-items: center;
  justify-content: center;
  ${(p) => p.isDisabled && "color: var(--gray25)"}
`

export const RightSlotContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: var(--form-element-height);
  width: var(--right-slot-width);
`
