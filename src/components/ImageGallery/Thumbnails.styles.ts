import styled, { css } from "styled-components/macro"
import Ratio from "react-ratio"

import { CONST } from "../../constants"

export const ThumbnailsContainer = styled.div`
  display: grid;
  gap: var(--spacing2);
  grid-template-columns: repeat(${CONST.ATTACHMENTS_MAX_COUNT}, minmax(calc(100vw / 5.5), 1fr));

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

  /* position: relative; */
  margin-top: var(--spacing2);

  /* remove this if it proves to be too difficult to implement a scrolling indicator */
  overflow-x: auto;

  @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
    grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
  }
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    overflow-x: visible;
  }
`

export const ThumbnailContainer = styled(Ratio)`
  position: relative;
  background: var(--almost-white);
  cursor: pointer;
  ${(p) =>
    !p.isCurrent &&
    css`
      filter: grayscale(25%);
    `}
`

export const InactiveOverlay = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
`
