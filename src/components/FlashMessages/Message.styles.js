import styled, { keyframes } from "styled-components/macro"

const fadein = keyframes`
from {
  transform: translateY(120%);
  opacity: 0;
}

to {
  transform: translateY(0);
  opacity: 1;
}
`
const fadeout = keyframes`
from {
  transform: translateY(0);
  opacity: 1;
}

to {
  transform: translateY(120%);
  opacity: 0;
}
`

export const MessageContainer = styled.div`
  --animation-duration: 0.35s;
  /* when to start the exit animation */
  --exit-delay: calc(${(p) => p.ttl}ms - var(--animation-duration));

  pointer-events: all;

  animation-name: ${fadein}, ${fadeout};
  animation-duration: var(--animation-duration);
  animation-fill-mode: both, forwards;
  animation-timing-function: ease-out, ease-out;
  animation-delay: 0s, var(--exit-delay);

  display: flex;
  color: #303030;
  /* border-radius: 3px; */
  border-left: 4px solid ${(p) => p.color};
  padding: var(--spacing3) 0;
  background: white;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.12);
  width: auto;
  /* margin-bottom: var(--spacing3); */
`

export const IconContainer = styled.div`
  color: ${(p) => p.color};
  font-size: 25px;
  padding-left: 14px;
`
export const Heading = styled.div`
  font-size: var(--fs-s);
  font-weight: bold;
`
export const Details = styled.div`
  font-size: 13px;
  color: var(--gray0);
`
export const ContentContainer = styled.div`
  padding-left: 14px;
  padding-right: var(--spacing3);
  display: flex;
  flex-direction: column;
  justify-content: center;
`
