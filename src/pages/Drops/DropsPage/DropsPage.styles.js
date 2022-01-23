import styled from "styled-components/macro"

export const ResultsContainer = styled.div`
  display: grid;
  gap: var(--spacing3);
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
`

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Header = styled.h1`
  text-align: center;
  margin: 0;
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    text-align: left;
  }
`
