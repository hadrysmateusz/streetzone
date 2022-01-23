import styled from "styled-components/macro"

export const OuterContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr min-content;
  height: 100%;
  > * {
    min-height: 0;
  }
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    min-height: 480px;
    max-height: 620px;
  }
`

export const ContentContainer = styled.div`
  position: relative;
  @media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
    margin: 0 calc(-1 * var(--spacing3));
  }
`

export const MainImageArea = styled.div`
  height: 100%;
  > * {
    height: 100%;
  }
`

export const MainImageContainer = styled.div`
  background: var(--almost-white);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-in;
`
