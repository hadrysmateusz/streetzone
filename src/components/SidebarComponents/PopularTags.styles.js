import styled from "styled-components/macro"

export const Container = styled.div`
  display: grid;
  align-content: start;
  justify-items: stretch;
`

export const Tag = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0;
  padding: var(--spacing1) var(--spacing2);

  color: var(--gray0);
  text-transform: uppercase;
  font-size: var(--font-size--xs);
  transition-property: background, color;
  transition-timing-function: linear;
  transition-duration: 100ms;
  :hover {
    background: var(--gray125);
    border-radius: 4px;
    color: var(--black0);
  }
`
