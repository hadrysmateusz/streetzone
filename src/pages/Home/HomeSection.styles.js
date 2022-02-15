import styled from "styled-components/macro"

const OuterContainerAttrs = (p) => ({
  ...p,
  deg: p.inverse ? "335deg" : "25deg",
})
export const OuterContainer = styled.div.attrs(OuterContainerAttrs)`
  background: linear-gradient(${(p) => p.deg}, #f0f0f0, white 43%);
  padding: var(--spacing4) 0;
`

export const InnerContainer = styled.div`
  display: grid;
  height: 100%;
  gap: var(--spacing3);

  @media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
    justify-items: ${(p) => (p.inverse ? "start" : "end")};
    grid-template-columns: 100%;
  }
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    gap: var(--spacing4);
  }
  @media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
    gap: var(--spacing5);
  }
`

export const SectionHeader = styled.h2`
  margin: 0;
  margin-bottom: var(--spacing2);
  font-size: var(--fs-xl);
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    font-size: 4.2rem;
  }
  font-weight: bold;
  color: var(--black25);
  text-align: ${(p) => (p.inverse ? "left" : "right")};
`

export const SectionBodyText = styled.p`
  margin: 0;

  color: var(--gray25);
  text-align: ${(p) => (p.inverse ? "left" : "right")};
`

export const TextContainer = styled.div`
  width: 100%;
  max-width: 450px;
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    margin-top: -24px;
    order: ${(p) => (p.inverse ? 0 : 1)};
  }
`

export const CardsContainer = styled.div`
  width: 100%;
`

export const CardsContainerInner = styled.div`
  display: grid;
  grid-template-columns: repeat(${(p) => p.numItems}, minmax(220px, 1fr));
  gap: var(--spacing3);
  justify-items: start;
  @media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
    ${(p) => p.inverse && "justify-items: end;"}
  }

  /* make the content go from edge to edge on mobile*/
  @media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
    display: grid;
    gap: var(--spacing2);
    grid-auto-columns: 250px;
    overflow: auto;
    width: auto;
    grid-auto-flow: column;

    --x-margin: calc(-1 * var(--spacing3));
    margin-left: var(--x-margin);
    margin-right: calc(-1 * var(--spacing3));
    padding: 0 var(--spacing3);
    &::after {
      content: "";
      display: block;
      width: var(--spacing2);
    }
  }
`

// TODO: replace these placeholders with better ones
export const Placeholder = styled.div`
  width: 100%;
  height: 280px;
  background: var(--almost-white);
`
