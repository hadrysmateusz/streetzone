import styled from "styled-components/macro"

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  > :not(:last-child) {
    margin-right: var(--spacing2);
  }
  > * {
    margin-bottom: var(--spacing2);
  }
  margin-bottom: calc(-1 * var(--spacing2));
`

export const TagContainer = styled.div`
  background: white;
  border: 1px solid var(--gray75);
  padding: var(--spacing1) var(--spacing2);
  text-align: center;
  text-transform: uppercase;
  font-size: var(--fs-xs);
  white-space: nowrap;
  overflow: hidden;
`
