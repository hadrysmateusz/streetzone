import styled from "styled-components/macro"

export const StyledSelect = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
`

export const Container = styled.label`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;
  background: white;
  padding: 0 var(--spacing3);
  border: 1px solid var(--gray75);
  :hover {
    border: 1px solid var(--gray25);
  }
  svg {
    margin-right: var(--spacing2);
  }
  height: var(--form-element-height);
`
