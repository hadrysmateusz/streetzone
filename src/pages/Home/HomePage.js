import { PageContainer } from "../../components/Containers"
import { SmallItemCard, SmallDropCard, PostCard } from "../../components/Cards"
import { PopularDesignersHomeSection } from "../../components/PopularDesigners"
import HelmetBasics from "../../components/HelmetBasics"

import { CONST } from "../../constants"
import { route } from "../../utils"

import MainCarousel from "./MainCarousel"
import HomeSection from "./HomeSection"
import MarketplacePromoted from "./MarketplacePromoted"
import { OuterContainer, StyledLink } from "./HomePage.styles"

const MarketplaceSection = () => (
  <HomeSection
    header="Tablica"
    body={
      <>
        Kupuj lub sprzedawaj. Poszerzaj swoją kolekcję, lub swój portfel. Zacznij{" "}
        <StyledLink to={route("NEW_ITEM")}>sprzedawać</StyledLink>, lub{" "}
        <StyledLink to={route("MARKETPLACE")}>znajdź coś dla siebie</StyledLink>
      </>
    }
    component={SmallItemCard}
    indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
    route={route("MARKETPLACE")}
    inverse
  />
)

const DropsSection = () => (
  <HomeSection
    header="Dropy"
    body={
      <>
        Dowiaduj się jako pierwszy o najważniejszych dropach. Otrzymuj powiadomienia, by nigdy
        żadnego nie przegapić. Zobacz{" "}
        <StyledLink to={route("DROPS_SECTION", { id: "upcoming" })}>nadchodzące dropy</StyledLink>,
        lub sprawdź nasze{" "}
        <StyledLink to={route("DROPS_SECTION", { id: "archive" })}>archiwum</StyledLink>
      </>
    }
    indexName={CONST.BLOG_DROP_NEWEST_ALGOLIA_INDEX}
    route={route("DROPS_SECTION", { id: "newest" })}
    component={SmallDropCard}
  />
)

const BlogSection = () => (
  <HomeSection
    header="Blog"
    body={
      <>
        Artykuły, Newsy, Informacje. Dowiedz się jak czyścić buty i ubrania, nie uszkadzając ich,
        sprawdź jak rozpoznać fake'a, i{" "}
        <StyledLink to={route("BLOG_HOME")}>wiele więcej</StyledLink>...
      </>
    }
    indexName={CONST.BLOG_POST_ALGOLIA_INDEX}
    route={route("BLOG_HOME")}
    component={PostCard}
    inverse
  />
)

const HomePage = () => {
  return (
    <OuterContainer>
      {/* TODO: add some sort of slogan to the title here */}
      <HelmetBasics fullTitle={CONST.BRAND_NAME} />
      <MainCarousel />
      <MarketplaceSection />
      <DropsSection />
      <BlogSection />
      <PageContainer>
        <MarketplacePromoted />
        <PopularDesignersHomeSection />
      </PageContainer>
    </OuterContainer>
  )
}

export default HomePage
