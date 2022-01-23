import styled, { css } from "styled-components/macro"

export const IconButtonContainer = styled.div`
  padding: var(--spacing1);
  color: var(--gray25);
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease;
  font-size: ${(p) => 10 * (p.scale || 1)}px;
  ${(p) =>
    !p.isActive &&
    css`
      :hover {
        ${(p) => p.animation}
      }
    `}

  .filled {
    color: var(--gray25);
  }
`
