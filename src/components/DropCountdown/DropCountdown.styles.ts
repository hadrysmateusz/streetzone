import styled from "styled-components/macro"

interface CountdownContainerProps {
  isArchival?: boolean
}
export const CountdownContainer = styled.div<CountdownContainerProps>`
  border: 1px solid var(--gray75);
  border-radius: 4px;
  position: relative;
  color: var(--gray0);
  white-space: nowrap;
  margin-left: var(--spacing1);
  display: flex;

  .value-container {
    padding: var(--spacing1) var(--spacing2);
    :not(:last-child) {
      border-right: 1px solid var(--gray75);
    }
  }

  ::before {
    position: absolute;
    top: -0.8em;
    left: var(--spacing1);
    color: var(--gray50);
    ${(p) => !p.isArchival && "content: 'ZA';"}
    display: block;
    padding: 0 3px;
    background: white;
    font-size: var(--fs-xs);
  }
`
