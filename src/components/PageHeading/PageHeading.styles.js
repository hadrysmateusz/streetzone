import styled from "styled-components/macro"

export const PageHeadingContainer = styled.div`
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  margin: 0 0 var(--spacing3);
  @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
    margin: var(--spacing3) 0 var(--spacing4);
  }
`
