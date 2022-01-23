import styled from "styled-components/macro"

export const MainCarouselContainer = styled.div`
  background: linear-gradient(30deg, #373737, #1a1a1a 55%);
  padding-top: var(--spacing4);
  padding-bottom: var(--spacing2);
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    padding-top: 40px;
  }
`

export const LogoContainer = styled.div`
  height: 100px;
  margin-bottom: var(--spacing3);
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    height: 130px;
    margin-bottom: var(--spacing4);
  }
`

export const MainText = styled.div`
  margin-bottom: var(--spacing2);
  font-weight: bold;
  color: white;
  text-align: center;
  font-size: var(--fs-s);
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    font-size: var(--fs-l);
  }
`

export const SecondaryText = styled.div`
  margin-bottom: var(--spacing4);
  font-size: var(--fs-xs);
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    font-size: var(--fs-s);
  }
  color: var(--gray50);
  text-align: center;
`
