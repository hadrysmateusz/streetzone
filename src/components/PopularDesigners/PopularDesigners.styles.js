import styled from "styled-components/macro"

export const OuterContainer = styled.div`
  margin-top: var(--spacing5);
  @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
    margin-top: var(--spacing6);
  }
`

export const InnerContainer = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  gap: var(--spacing2);
  @media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
    gap: var(--spacing3);
  }
`

export const DesignerContainer = styled.div`
  border-radius: 50%;
  border: 1px solid var(--gray50);
  overflow: hidden;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ImageContainer = styled.div`
  padding: 18%;
  width: 100%;
  height: 100%;
`
