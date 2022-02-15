import { Link } from "react-router-dom"

import { LinkButton, ButtonContainer } from "../../components/Button"
import { StatelessSearchWrapper } from "../../components/InstantSearchWrapper"
import FirebaseImage from "../../components/FirebaseImage"
import PageHeading from "../../components/PageHeading"

import { itemDataHelpers, route } from "../../utils"
import { CONST } from "../../constants"

import {
  Name,
  Designers,
  InfoContainer,
  OuterContainer,
  PromotedItemContainer,
  InnerContainer,
} from "./MarketplacePromoted.styles"

const { formatDesigners } = itemDataHelpers

const PromotedItem = (props) => {
  const { attachments, mainImageIndex, name, designers, price, id } = props

  const formattedDesigners = formatDesigners(designers)
  const itemLink = route("ITEM_DETAILS", { id })

  return (
    <PromotedItemContainer>
      <InfoContainer>
        <Designers>{formattedDesigners}</Designers>
        <Link to={itemLink}>
          <Name title={name}>{name}</Name>
        </Link>
        <ButtonContainer noMargin>
          <LinkButton primary to={itemLink}>
            Kup za {price}zł
          </LinkButton>
        </ButtonContainer>
      </InfoContainer>
      <Link to={itemLink}>
        <FirebaseImage storageRef={attachments[mainImageIndex]} size="M" />
      </Link>
    </PromotedItemContainer>
  )
}

const MarketplacePromoted = () => (
  <OuterContainer>
    <PageHeading emoji={"🔥"}>Promowane na tablicy</PageHeading>
    <StatelessSearchWrapper
      indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
      refinements={{ promotedUntil: { min: Date.now() } }}
      limit={4}
    >
      {(hits) => (
        <InnerContainer>
          {hits.map((result) => (
            <PromotedItem key={result.id} {...result} />
          ))}
        </InnerContainer>
      )}
    </StatelessSearchWrapper>
  </OuterContainer>
)

export default MarketplacePromoted
