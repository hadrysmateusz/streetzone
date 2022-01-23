import styled from "styled-components/macro"

export const PromotedContainer = styled.div`
  display: grid;
  gap: var(--spacing2);

  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing3);
    height: 40vw;
    max-height: 500px;
  }
`

export const OuterContainer = styled.div`
  padding-bottom: var(--spacing3);
`
