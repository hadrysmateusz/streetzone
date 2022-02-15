import { css } from "styled-components/macro"

export const disabledStyles = css`
  background: var(--almost-white);
  border-color: var(--gray50);
`

export const hoverStyles = css`
  border-color: var(--black75);
`

export const focusStyles = css`
  border-color: var(--black75);
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
`

export const placeholderStyles = css`
  color: var(--gray0);
`

export type BasicStylesProps = {
  hasError?: boolean
}

export const basicStyles = (p: BasicStylesProps) => css`
  border: 1px solid ${!!p.hasError ? "var(--danger50)" : "var(--gray75)"};
  border-radius: 0;
  :not([type="radio"]):not([type="checkbox"]) {
    -webkit-appearance: none;
  }
  width: 100%;
  transition: box-shadow 0.15s ease, border-color 0.15s ease;
`

export const commonStyles = (p: BasicStylesProps) => css`
  ${basicStyles(p)}

  ::placeholder {
    ${placeholderStyles}
  }

  &[disabled] {
    ${disabledStyles}
  }

  &:not([disabled]) {
    :hover {
      ${hoverStyles}
    }
    :focus {
      ${focusStyles}
    }
  }
`

export default commonStyles
