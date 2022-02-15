import { Link } from "react-router-dom"
import { withBreakpoints } from "react-breakpoints"
import Ratio from "react-ratio"

import { CONST } from "../../constants"
import { route } from "../../utils"
import { encodeURL } from "../../utils/algoliaURLutils"

import FirebaseImage from "../FirebaseImage"
import { StatelessSearchWrapper } from "../InstantSearchWrapper"
import PageHeading from "../PageHeading"

import {
  DesignerContainer,
  ImageContainer,
  InnerContainer,
  OuterContainer,
} from "./PopularDesigners.styles"

const Designer = (props) => (
  <Link to={encodeURL({ designers: [props.label] }, route("MARKETPLACE"))}>
    <DesignerContainer>
      <ImageContainer>
        <Ratio>
          <FirebaseImage storageRef={props.logoRef} size="original" /* "M" */ />
        </Ratio>
      </ImageContainer>
    </DesignerContainer>
  </Link>
)

export const PopularDesigners = withBreakpoints(({ currentBreakpoint }) => {
  const limit = +currentBreakpoint < 1 ? 4 : 7

  return (
    <StatelessSearchWrapper
      indexName={CONST.DESIGNERS_ALGOLIA_INDEX}
      limit={limit}
      ignoreArchivedStatus
    >
      {(hits) => (
        <InnerContainer>
          {hits.map((hit) => (
            <Designer key={hit.id} {...hit} />
          ))}
        </InnerContainer>
      )}
    </StatelessSearchWrapper>
  )
})

export const PopularDesignersHomeSection = () => (
  <OuterContainer>
    <PageHeading>Kupuj popularne marki</PageHeading>
    <PopularDesigners />
  </OuterContainer>
)
