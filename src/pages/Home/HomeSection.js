import { Link } from "react-router-dom"
import { withBreakpoints } from "react-breakpoints"

import PlaceholderWrapper from "../../components/PlaceholderWrapper"
import { PageContainer } from "../../components/Containers"
import { StatelessSearchWrapper } from "../../components/InstantSearchWrapper"

import {
  CardsContainer,
  CardsContainerInner,
  InnerContainer,
  OuterContainer,
  Placeholder,
  SectionBodyText,
  SectionHeader,
  TextContainer,
} from "./HomeSection.styles"

const HomeSection = withBreakpoints(
  ({ inverse = false, header, body, component: C, indexName, currentBreakpoint, route }) => {
    const itemsLimit = currentBreakpoint < 2 ? 3 : 2

    return (
      <OuterContainer inverse={inverse}>
        <StatelessSearchWrapper indexName={indexName} limit={itemsLimit}>
          {(results) => (
            <PageContainer fullHeight>
              <InnerContainer inverse={inverse}>
                <TextContainer inverse={inverse}>
                  <Link to={route}>
                    <SectionHeader inverse={inverse}>{header}</SectionHeader>
                  </Link>
                  <SectionBodyText inverse={inverse}>{body}</SectionBodyText>
                </TextContainer>
                <CardsContainer inverse={inverse}>
                  <CardsContainerInner inverse={inverse} numItems={itemsLimit}>
                    <PlaceholderWrapper placeholder={Placeholder} count={itemsLimit}>
                      {results.map((result) => (
                        <C {...result} key={result.id} />
                      ))}
                    </PlaceholderWrapper>
                  </CardsContainerInner>
                </CardsContainer>
              </InnerContainer>
            </PageContainer>
          )}
        </StatelessSearchWrapper>
      </OuterContainer>
    )
  }
)

export default HomeSection
