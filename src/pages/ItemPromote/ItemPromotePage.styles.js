import styled from "styled-components/macro"

export const PageHeader = styled.div`
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  margin: 0 0 var(--spacing3);
  @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
    margin: var(--spacing3) 0 var(--spacing4);
  }
`

export const PromoteOptionsContainer = styled.div`
  display: grid;
  gap: var(--spacing3);
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    grid-template-columns: 1fr 1.12fr 1fr;
    align-items: center;
  }

  @media (min-width: ${(p) => p.theme.breakpoints[5]}px) {
    gap: var(--spacing4);
  }
`
