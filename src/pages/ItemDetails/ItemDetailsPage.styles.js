import styled from "styled-components/macro"

export const DatesContainer = styled.div`
  display: flex;
  margin-bottom: var(--spacing3);

  > * + * {
    margin-left: var(--spacing2);
    @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
      margin-left: var(--spacing3);
    }
  }
`
