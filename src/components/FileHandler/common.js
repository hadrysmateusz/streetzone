import styled from "styled-components/macro"
import { overlayCommon, overlayCommonStyles } from "../../style-utils"

import { commonStyles } from "../FormElements"

export const FileHandlerContainer = styled.div`
  ${commonStyles.basicStyles}
  min-height: 150px;

  &[disabled] {
    ${commonStyles.disabledStyles}
  }

  &:not([disabled]) {
    :hover {
      /* only apply hover styles if the container is empty */
      ${(p) => p.isEmpty && commonStyles.hoverStyles}
    }
    :focus {
      ${commonStyles.focusStyles}
    }
  }

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--spacing3);
  padding: var(--spacing3);
  position: relative;
`

export const EmptyState = styled.div`
  ${overlayCommon}
  ${commonStyles.placeholderStyles}
`

export const IconContainer = styled.div`
  text-align: center;
  padding: var(--spacing1) var(--spacing2);
  margin: 0 var(--spacing1);
  transition: transform 0.12s linear;
  cursor: pointer;
  :hover {
    color: var(--gray100);
    transform: scale(1.03);
  }
`

export const ErrorContainer = styled.div`
  ${overlayCommonStyles}
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 75;
  padding: var(--spacing2);
  font-size: var(--font-size--xs);
`

export const Overlay = styled.div`
  ${overlayCommon}
  ${overlayCommonStyles}
	z-index: 76;
  ${(p) =>
    !p.alwaysShow &&
    `opacity: 0;
    transition: opacity 0.2s ease;    
    &:hover {
      opacity: 1;
    }`}
`
