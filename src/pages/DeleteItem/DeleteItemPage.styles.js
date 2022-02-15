import styled from "styled-components/macro"

export const OuterContainer = styled.div`
  max-width: 430px;
  margin: 0 auto;
`

export const ItemContainer = styled.div`
  margin: 0 auto var(--spacing3);
  max-width: 225px;
  @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
    max-width: 270px;
  }
`

export const Disclaimer = styled.div`
  color: var(--gray0);
  text-transform: uppercase;
  margin-bottom: var(--spacing3);
  text-align: center;
  font-size: var(--fs-xs);
`
