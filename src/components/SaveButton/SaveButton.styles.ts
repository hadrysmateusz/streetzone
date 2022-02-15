import styled, {
  css,
  FlattenSimpleInterpolation,
} from "styled-components/macro"

export const IconButtonContainer = styled.div<{
  animation: FlattenSimpleInterpolation
  scale: number
  isActive?: boolean
}>`
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
        ${p.animation}
      }
    `}

  .filled {
    color: var(--gray25);
  }
`
