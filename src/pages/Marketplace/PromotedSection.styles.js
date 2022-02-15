import styled from "styled-components/macro"

import { overlayTextShadow } from "../../style-utils"

export const OuterContainer = styled.div`
  margin-bottom: var(--spacing3);
`

export const InnerContainerContainer = styled.div``

export const TopContainer = styled.div`
  margin-top: var(--spacing3);
  display: grid;
  gap: var(--spacing2);

  grid-auto-rows: minmax(100px, 22vw);

  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: var(--spacing3);
    height: 440px;
    > *:first-child {
      grid-row: span 2;
    }
  }
`

export const PromotedItemContainer = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  padding: var(--spacing3) 0;
  ${overlayTextShadow}

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: flex-end;

  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 42%,
      rgba(0, 0, 0, 0.25) 62%,
      rgba(0, 0, 0, 0.8) 100%
    ),
    url(${(p) => p.image}), var(--gray100);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

export const Name = styled.div`
  font-weight: bold;
  font-size: var(--fs-m);
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    font-size: var(--fs-l);
  }
`

export const Designers = styled.div`
  font-size: var(--fs-xs);
  color: var(--gray100);
  text-transform: uppercase;
`

export const PlaceholderContainer = styled.div`
  width: 100%;
  height: 100%;
  background: var(--almost-white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--gray25);
  padding: var(--spacing3) 0;

  .icon {
    font-size: 3rem;
    color: var(--gray50);
  }
`

export const BottomContainer = styled.div`
  margin-top: var(--spacing3);
  display: grid;
  gap: var(--spacing2);
  grid-auto-columns: 120px;
  overflow: auto;
  width: auto;
  grid-auto-flow: column;
  grid-auto-columns: 220px;
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    gap: var(--spacing3);
  }

  /* make the content go from edge to edge on mobile*/
  @media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
    --x-margin: calc(-1 * var(--spacing3));
    margin-left: var(--x-margin);
    margin-right: var(--x-margin);
    padding: 0 var(--spacing3);
    &::after {
      content: "";
      display: block;
      width: var(--spacing2);
    }
  }
`
