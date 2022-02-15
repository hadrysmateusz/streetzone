import styled, {
  css,
  FlattenSimpleInterpolation,
} from "styled-components/macro"

import { commonStyles } from "../FormElements"
import { BasicStylesProps } from "../FormElements/Common.styles"

const smallSquare = css`
  width: 260px;
  height: 260px;
`

export const FileHandlerSingleContainer = styled.div<
  BasicStylesProps & {
    variant?: "small-square"
    containerStyles?: FlattenSimpleInterpolation
  }
>`
  ${(p) => commonStyles.basicStyles(p)}
  min-height: 150px;

  &[disabled] {
    ${commonStyles.disabledStyles}
  }

  &:not([disabled]) {
    :hover {
      ${commonStyles.hoverStyles}
    }
    :focus {
      ${commonStyles.focusStyles}
    }
  }

  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  ${(p) => {
    switch (p.variant) {
      case "small-square":
        return smallSquare
      default:
        return ""
    }
  }}

  ${(p) => p.containerStyles ?? undefined}
`
