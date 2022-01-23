import styled from "styled-components/macro"

export const MenuNavItem = styled.div`
  user-select: none;
  white-space: nowrap;
  color: var(--gray0);
  font-weight: bold;
  font-size: var(--font-size--m);
  > * {
    padding: var(--spacing3);
  }
  border-top: 1px solid var(--gray75);
  &:first-of-type {
    border-top: none;
  }
  &:last-child {
    border-bottom: 1px solid var(--gray75);
  }
`

export const IconContainer = styled.div`
  padding-left: 0;
  cursor: pointer;
  font-size: 2.15rem;
`
