import { withBreakpoints } from "react-breakpoints"

import PlaceholderWrapper from "../../../components/PlaceholderWrapper"
import { PageContainer } from "../../../components/Containers"
import { StatelessSearchWrapper } from "../../../components/InstantSearchWrapper"

import { CONST } from "../../../constants"

import PromotedDrop from "./PromotedDrop"
import { OuterContainer, PromotedContainer } from "./PromotedSection.styles"

const PromotedSection = withBreakpoints(({ currentBreakpoint }) => {
  const isMobile = currentBreakpoint <= 1

  return (
    /* intentionally hidden visually to prevent resizing bug */
    <div hidden={isMobile}>
      <PageContainer>
        <OuterContainer>
          <StatelessSearchWrapper limit={2} indexName={CONST.BLOG_DROP_NEWEST_ALGOLIA_INDEX}>
            {(results) => (
              <PromotedContainer>
                <PlaceholderWrapper count={2}>
                  {results.map((hit) => (
                    <PromotedDrop key={hit.id} {...hit} />
                  ))}
                </PlaceholderWrapper>
              </PromotedContainer>
            )}
          </StatelessSearchWrapper>
        </OuterContainer>
      </PageContainer>
    </div>
  )
})

export default PromotedSection
