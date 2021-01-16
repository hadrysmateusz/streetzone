import React from "react"
import styled from "styled-components/macro"

import { PageContainer } from "../../components/Containers"
import { Carousel } from "../../components/Carousel"

import { ReactComponent as Logo } from "./white-logomark-with-name.svg"

const MainCarouselContainer = styled.div`
  background: linear-gradient(30deg, #373737, #1a1a1a 55%);
  padding-top: var(--spacing4);
  padding-bottom: var(--spacing2);
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    padding-top: 40px;
  }
`

const LogoContainer = styled.div`
  height: 100px;
  margin-bottom: var(--spacing3);
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    height: 130px;
    margin-bottom: var(--spacing4);
  }
`

const MainText = styled.div`
  margin-bottom: var(--spacing2);
  font-weight: bold;
  color: white;
  text-align: center;
  font-size: var(--fs-s);
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    font-size: var(--fs-l);
  }
`

const SecondaryText = styled.div`
  margin-bottom: var(--spacing4);
  font-size: var(--fs-xs);
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    font-size: var(--fs-s);
  }
  color: var(--gray50);
  text-align: center;
`

const CopyContainer = styled.div``

const Copy = ({ main, secondary }) => {
  return (
    <CopyContainer>
      <MainText>{main}</MainText>
      <SecondaryText>{secondary}</SecondaryText>
    </CopyContainer>
  )
}

const MainCarousel = () => (
  <MainCarouselContainer>
    <PageContainer>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Carousel autoPlay interval={3500}>
        {[
          <Copy
            main="Cały polski streetwear w jednym miejscu"
            secondary="Tablica. Dropy. Artykuły. Newsy."
            key="1"
          />,
          <Copy
            main="Dbamy o jakość i autentyczność"
            secondary="U nas nie znajdziesz fake'ów"
            key="2"
          />,
        ]}
      </Carousel>
    </PageContainer>
  </MainCarouselContainer>
)

export default MainCarousel
