import styled from "styled-components/macro"

export const Toggle = styled.div`
  border: 1px solid var(--gray75);
  :hover {
    border: 1px solid var(--gray25);
  }
  background: white;
  padding: 0 var(--spacing3);
  color: var(--black75);
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;
  cursor: pointer;
  flex: 1;

  svg {
    margin-right: var(--spacing2);
  }
`

export const FiltersToggleContainer = styled.div`
  height: var(--form-element-height);
  display: flex;
  @media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
    min-width: 155px;
  }
`
