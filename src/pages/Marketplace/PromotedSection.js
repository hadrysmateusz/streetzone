import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withBreakpoints } from "react-breakpoints"

import { StatelessSearchWrapper } from "../../components/InstantSearchWrapper"
import { PageContainer } from "../../components/Containers"
import { TextBlock } from "../../components/StyledComponents"
import { SmallItemCard } from "../../components/Cards"
import { Button, ButtonContainer } from "../../components/Button"

import { CONST } from "../../constants"
import { mapN, route, itemDataHelpers, getImageUrl } from "../../utils"

import {
  BottomContainer,
  Designers,
  InnerContainerContainer,
  Name,
  OuterContainer,
  PlaceholderContainer,
  PromotedItemContainer,
  TopContainer,
} from "./PromotedSection.styles"

const { formatDesigners, formatPrice } = itemDataHelpers

const NUMBER_OF_PROMOTED_ITEMS = 3

const InnerContainer = withBreakpoints((props) => {
  const { items, currentBreakpoint } = props

  const isMobile = +currentBreakpoint < 2

  const showMain = !isMobile

  const main = isMobile ? [] : items.slice(0, NUMBER_OF_PROMOTED_ITEMS)
  const other = isMobile ? items : items.slice(NUMBER_OF_PROMOTED_ITEMS)
  const hasMain = main && main.length > 0
  const hasOther = other && other.length > 0
  const nToFill = !hasMain ? NUMBER_OF_PROMOTED_ITEMS : NUMBER_OF_PROMOTED_ITEMS - main.length

  return (
    <InnerContainerContainer>
      <TextBlock bold uppercase centered>
        <span role="img" aria-label="promowane">
          🔥 Promowane
        </span>
      </TextBlock>
      {showMain && (
        <TopContainer>
          {main.map((item) => (
            <PromotedItem item={item} key={item.id} />
          ))}
          {mapN(nToFill, (i) => (
            <PromotedPlaceholder key={i} />
          ))}
        </TopContainer>
      )}
      {hasOther && (
        <BottomContainer>
          {other.map((item) => (
            <SmallItemCard key={item.id} {...item} />
          ))}
        </BottomContainer>
      )}
    </InnerContainerContainer>
  )
})

const PromotedItem = ({ item }) => {
  const imageUrl = getImageUrl(item.attachments[item.mainImageIndex], "L")
  const formattedDesigners = formatDesigners(item.designers)
  const formattedPrice = formatPrice(item.price)

  return (
    <Link to={route("ITEM_DETAILS", { id: item.id })}>
      <PromotedItemContainer image={imageUrl}>
        <Designers>{formattedDesigners}</Designers>
        <Name>{item.name}</Name>

        <ButtonContainer centered>
          <Button>Kup za {formattedPrice}</Button>
        </ButtonContainer>
      </PromotedItemContainer>
    </Link>
  )
}

const PromotedPlaceholder = () => (
  <Link to={route("PROMOTING_INFO")}>
    <PlaceholderContainer>
      <div className="icon">
        <FontAwesomeIcon icon="plus" />
      </div>
      <div className="main-text">Twój przedmiot tutaj</div>
    </PlaceholderContainer>
  </Link>
)

const PromotedSection = () => (
  <OuterContainer>
    <StatelessSearchWrapper
      indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
      refinements={{ promotedUntil: { min: Date.now() } }}
    >
      {(hits) => (
        <PageContainer noMargin>
          <InnerContainer items={hits} />
        </PageContainer>
      )}
    </StatelessSearchWrapper>
  </OuterContainer>
)

export default PromotedSection
