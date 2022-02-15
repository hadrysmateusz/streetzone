import styled from "styled-components/macro"

const InfoBox = styled.div<{ span?: number; columns?: number }>`
  ${(p) => p.span && `grid-column: span ${p.span};`}
  background: var(--almost-white);
  border: 1px solid var(--gray100);
  padding: var(--spacing2);
  @media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
    padding: var(--spacing2) var(--spacing3);
  }

  display: grid;
  gap: var(--spacing2);
  @media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
    gap: var(--spacing3);
    ${(p) => p.columns && `grid-template-columns: repeat(${p.columns}, 1fr);`}
  }
`

export default InfoBox
