import styled from "styled-components/macro"

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: ${(p) => p.size * 30}px;
  max-height: 100%;
`

export const FullPageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
`
