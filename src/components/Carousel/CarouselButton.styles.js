import styled from "styled-components/macro"

export const StyledButton = styled.button`
  --size: calc(42px * ${(p) => p.scale});

  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--size);
  height: calc(2 * var(--size));
  font-size: 12px;
  background: white;
  color: var(--black25);
  opacity: 0.85;
  transition: all 0.2s;
  cursor: pointer;
  outline: none;
  border: none;
  ${(p) => `padding-${p.direction}: 4px`}
  &:hover {
    opacity: 1;
  }

  /* positioning */
  top: calc(50% - var(--size));
  position: absolute;
  ${(p) => p.direction}: 0;
`
