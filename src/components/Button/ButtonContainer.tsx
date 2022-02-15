import styled from "styled-components/macro"

type ButtonContainerProps = {
  vertical?: boolean
  noMargin?: boolean
  alignRight?: boolean
  centered?: boolean
}
export const ButtonContainer = styled.div<ButtonContainerProps>`
  width: 100%;
  display: flex;

  ${(p) => p.vertical && "flex-direction: column;"}
  ${(p) => !p.noMargin && "margin: var(--spacing2) 0;"}
  ${(p) => p.alignRight && "justify-content: flex-end;"}
  ${(p) => p.centered && "justify-content: center;"}
  > * + * {
    ${(p) =>
      p.vertical
        ? "margin-top: var(--spacing2);"
        : "margin-left: var(--spacing2);"}
  }
`
