import styled from "styled-components/macro"

export const List = styled.div`
  display: grid;
  gap: var(--spacing2);
  grid-template-columns: 1fr 1fr;

  > * {
    overflow: hidden;
  }
`
