import styled from "styled-components/macro"

export const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing2);
  @media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
    gap: var(--spacing3);
  }
`

export const FormElement = styled.div`
  grid-column: span 2;
  @media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
    ${(p) => p.small && "grid-column: span 1;"}
  }
`
