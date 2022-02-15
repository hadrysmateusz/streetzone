import styled from "styled-components/macro"

export const MainInfoContainer = styled.div`
  display: grid;
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    grid-auto-flow: column;
    grid-template-columns: 1fr max-content;
  }
`

export const SecondContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
    margin-top: var(--spacing3);
    margin-bottom: var(--spacing1);
  }
`

export const InfoContainer = styled.div`
  display: grid;
  gap: var(--spacing2);
  grid-auto-rows: min-content;
  max-width: 600px;
`

export const TopContainer = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: var(--spacing3);
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    grid-template-columns: min-content 1fr;
    gap: var(--spacing3);
  }
`
