import styled from "styled-components/macro"

export const OverlayContainer = styled.div<{ color?: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 990;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.color ?? "transparent"};
`
