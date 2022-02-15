import styled from "styled-components/macro"

export const OuterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
`
export const OuterInnerContainer = styled.div`
  display: grid;
  grid-template-columns: max-content;
  gap: var(--spacing3);
  margin-bottom: var(--spacing3);
`
