import styled from "styled-components/macro"
import AutosizeTextarea from "react-textarea-autosize"

import commonStyles from "./Common.styles"

interface StyledTextareaProps {
  hasError: boolean
  autoResize: boolean
  numberOfLines: number
}

export const StyledTextarea = styled(AutosizeTextarea)<StyledTextareaProps>`
  display: block;
  font-size: var(--font-size--s) !important;
  padding: var(--spacing2);
  resize: vertical;
  --line-height: 1.45em;
  --min-height: calc(${(p) => p.numberOfLines} * var(--line-height));
  line-height: var(--line-height);
  min-height: var(--min-height);
  ${(p) => !p.autoResize && "max-height: var(--min-height);"}

  ${commonStyles}

  border-color: ${(p) => p.hasError && "var(--danger50)"};
`
