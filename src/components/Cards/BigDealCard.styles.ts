import styled from "styled-components/macro"

export const ValueContainer = styled.div`
  border: 1px solid var(--gray75);
  border-radius: 4px;
  position: relative;
  color: var(--gray0);
  white-space: nowrap;
  margin-left: var(--spacing1);
  display: flex;
  align-items: center;

  .value-container {
    padding: var(--spacing1) var(--spacing2);
    border-right: 1px solid var(--gray75);
  }
`

export const ExternalLink = styled.a`
  padding: var(--spacing1) 7px;
  font-size: 1.3rem;
  :hover {
    color: var(--black0);
  }
`
