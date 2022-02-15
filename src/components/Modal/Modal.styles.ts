import styled from "styled-components/macro"

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
`

export const ModalBox = styled.div`
  background: white;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.45);
  @media (max-width: ${(p) => p.theme.breakpoints[0] - 1}px) {
    width: 100vw;
  }
  z-index: 1001;
  position: relative;
`
