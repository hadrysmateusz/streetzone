import styled from "styled-components/macro"

export const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ClearFiltersButton = styled.div`
  color: var(--danger50);
  font-weight: var(--semi-bold);
  :hover {
    text-decoration: underline;
  }
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 var(--width);
  margin-left: var(--spacing2);
`

export const Container = styled.div`
  font-size: var(--font-size--xs);
  display: flex;
  flex-flow: row wrap;
  margin: calc(-1 * var(--spacing1));
`

export const Item = styled.div`
  padding: var(--spacing2);
  background: white;
  border: 1px solid var(--gray75);
  margin: var(--spacing1);
`
