import { withBreakpoints } from "react-breakpoints"

import { CONST } from "../../../constants"

import PlaceholderWrapper from "../../../components/PlaceholderWrapper"
import { StatelessSearchWrapper } from "../../../components/InstantSearchWrapper"
import { Carousel } from "../../../components/Carousel"
import { PageContainer } from "../../../components/Containers"

import PromotedPost from "../PromotedPost"

import { DesktopContainer, MobileContainer } from "./PromotedSection.styles"

const MobilePromotedSection = ({ results }) => (
  <MobileContainer>
    <Carousel>
      {results.map((result) => (
        <PromotedPost key={result.id} {...result} />
      ))}
    </Carousel>
  </MobileContainer>
)

const DesktopPromotedSection = ({ results }) => (
  <PageContainer>
    <DesktopContainer>
      <PlaceholderWrapper count={3}>
        {results.map((result) => (
          <PromotedPost key={result.id} {...result} />
        ))}
      </PlaceholderWrapper>
    </DesktopContainer>
  </PageContainer>
)

const PromotedSection = withBreakpoints(({ currentBreakpoint }) => {
  const isMobile = currentBreakpoint <= 1

  // TODO: decide whether to manually promoted posts (implement it here) or just display newest stuff at the top (then remove promoting-related stuff from admin interface and db)

  return (
    <StatelessSearchWrapper limit={3} indexName={CONST.BLOG_POST_ALGOLIA_INDEX}>
      {(results) =>
        isMobile ? (
          <MobilePromotedSection results={results} />
        ) : (
          <DesktopPromotedSection results={results} />
        )
      }
    </StatelessSearchWrapper>
  )
})

export default PromotedSection
