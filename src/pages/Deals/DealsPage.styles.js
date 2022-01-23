import styled from "styled-components/macro"

export const Heading = styled.h1`
  text-align: center;
  margin: 0 auto;
  font-size: var(--fs-xl);
`

export const Info = styled.p`
  margin: var(--spacing3) auto var(--spacing4);
  color: var(--gray0);
  max-width: 240px;
  text-align: center;
`

export const ResultsContainer = styled.div`
  margin-top: var(--spacing3);
  display: grid;
  gap: var(--spacing3);
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
`
