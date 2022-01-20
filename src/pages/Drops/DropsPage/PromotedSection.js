import React from "react"
import styled from "styled-components/macro"
import { withBreakpoints } from "react-breakpoints"

import PlaceholderWrapper from "../../../components/PlaceholderWrapper"
import { PageContainer } from "../../../components/Containers"
import { StatelessSearchWrapper } from "../../../components/InstantSearchWrapper"

import { CONST } from "../../../constants"

import PromotedDrop from "../PromotedDrop"

const PromotedContainer = styled.div`
  display: grid;
  gap: var(--spacing2);

  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing3);
    height: 40vw;
    max-height: 500px;
  }
`

const OuterContainer = styled.div`
  padding-bottom: var(--spacing3);
`

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
