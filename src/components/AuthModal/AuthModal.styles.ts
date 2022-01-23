import styled from "styled-components/macro"

export const ModalOuterContainer = styled.div`
  max-width: 100vw;
  min-height: 515px;
  overflow: hidden;
  width: 670px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`
export const ModalContent = styled.div`
  padding: var(--spacing4);
`
export const ModalAside = styled.div`
  background: black;
  display: flex;
  justify-content: center;
  align-content: center;
  svg {
    width: 50%;
  }
`
export const LinkButton = styled.span`
  cursor: pointer;
  text-decoration: underline;
  :hover {
    color: var(--accent50);
  }
`
