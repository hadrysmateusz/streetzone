import styled from "styled-components/macro"

import { overlayTextShadow, getCategoryColor } from "../../style-utils"

export const PromotedPostContainer = styled.div`
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 42%,
      rgba(0, 0, 0, 0.25) 62%,
      rgba(0, 0, 0, 0.8) 100%
    ),
    url(${(p) => p.image}), var(--almost-white);
  color: white;
  padding: var(--spacing3) 0;
  overflow-y: hidden;
  text-align: center;

  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    :hover {
      .info-container {
        transform: none;
      }
    }
  }

  .info-container {
    transition: transform 200ms ease;
    transform: translateY(var(--spacing4));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }

  .additional-info {
    margin-top: var(--spacing3);
  }

  .title {
    font-family: var(--font-family--serif);
    font-size: var(--font-size--m);
    font-weight: bold;
    max-width: 75vw;
    padding: var(--spacing2);
  }
  .info {
    border-left: 3px solid ${(p) => getCategoryColor(p.category)};
    padding-left: var(--spacing2);
    line-height: 1.4;
    color: var(--almost-white);
  }

  ${overlayTextShadow}

  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`
