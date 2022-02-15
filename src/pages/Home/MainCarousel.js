import { PageContainer } from "../../components/Containers"
import { Carousel } from "../../components/Carousel"

import { ReactComponent as Logo } from "./white-logomark-with-name.svg"
import {
  LogoContainer,
  MainCarouselContainer,
  MainText,
  SecondaryText,
} from "./MainCarousel.styles"

const Copy = ({ main, secondary }) => {
  return (
    <div>
      <MainText>{main}</MainText>
      <SecondaryText>{secondary}</SecondaryText>
    </div>
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
