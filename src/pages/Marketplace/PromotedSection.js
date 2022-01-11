import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withBreakpoints } from "react-breakpoints"

import { StatelessSearchWrapper } from "../../components/InstantSearchWrapper"
import { PageContainer } from "../../components/Containers"
import { TextBlock } from "../../components/StyledComponents"
import { SmallItemCard } from "../../components/Cards"
import Button, { ButtonContainer } from "../../components/Button"

import { CONST } from "../../constants"
import { overlayTextShadow } from "../../style-utils"
import { useImage } from "../../hooks"
import { mapN, route, itemDataHelpers } from "../../utils"

const { formatDesigners, formatPrice } = itemDataHelpers

const NUMBER_OF_PROMOTED_ITEMS = 3

const OuterContainer = styled.div`
  margin-bottom: var(--spacing3);
`

const InnerContainerContainer = styled.div``

const TopContainer = styled.div`
  margin-top: var(--spacing3);
  display: grid;
  gap: var(--spacing2);

  grid-auto-rows: minmax(100px, 22vw);

  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: var(--spacing3);
    height: 440px;
    > *:first-child {
      grid-row: span 2;
    }
  }
`

const PromotedItemContainer = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  padding: var(--spacing3) 0;
  ${overlayTextShadow}

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: flex-end;

  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 42%,
      rgba(0, 0, 0, 0.25) 62%,
      rgba(0, 0, 0, 0.8) 100%
    ),
    url(${(p) => p.image}), var(--gray100);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const Name = styled.div`
  font-weight: bold;
  font-size: var(--fs-m);
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    font-size: var(--fs-l);
  }
`

const Designers = styled.div`
  font-size: var(--fs-xs);
  color: var(--gray100);
  text-transform: uppercase;
`

const PlaceholderContainer = styled.div`
  width: 100%;
  height: 100%;
  background: var(--almost-white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--gray25);
  padding: var(--spacing3) 0;

  .icon {
    font-size: 3rem;
    color: var(--gray50);
  }
`

const BottomContainer = styled.div`
  margin-top: var(--spacing3);
  display: grid;
  gap: var(--spacing2);
  grid-auto-columns: 120px;
  overflow: auto;
  width: auto;
  grid-auto-flow: column;
  grid-auto-columns: 220px;
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    gap: var(--spacing3);
  }

  /* make the content go from edge to edge on mobile*/
  @media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
    --x-margin: calc(-1 * var(--spacing3));
    margin-left: var(--x-margin);
    margin-right: var(--x-margin);
    padding: 0 var(--spacing3);
    &::after {
      content: "";
      display: block;
      width: var(--spacing2);
    }
  }
`

const InnerContainer = withBreakpoints((props) => {
  // console.log("InnerContainer props:", props)

  const { items, currentBreakpoint } = props

  const isMobile = +currentBreakpoint < 2

  // console.log("PROMOTED. items:", items)

  const showMain = !isMobile

  const main = isMobile ? [] : items.slice(0, NUMBER_OF_PROMOTED_ITEMS)
  const other = isMobile ? items : items.slice(NUMBER_OF_PROMOTED_ITEMS)
  const hasMain = main && main.length > 0
  const hasOther = other && other.length > 0
  const nToFill = !hasMain ? NUMBER_OF_PROMOTED_ITEMS : NUMBER_OF_PROMOTED_ITEMS - main.length

  // console.log("PROMOTED. main:", main)

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
            <PromotedItem key={item.id} item={item} />
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
  const { imageURL } = useImage(item.attachments[item.mainImageIndex], "L")

  const formattedDesigners = formatDesigners(item.designers)
  const formattedPrice = formatPrice(item.price)

  return (
    <Link to={route("ITEM_DETAILS", { id: item.id })}>
      <PromotedItemContainer image={imageURL}>
        <Designers>{formattedDesigners}</Designers>
        <Name>{item.name}</Name>

        <ButtonContainer centered>
          <Button>Kup za {formattedPrice}</Button>
        </ButtonContainer>
      </PromotedItemContainer>
    </Link>
  )
}

const PromotedPlaceholder = () => {
  return (
    <Link to={route("PROMOTING_INFO")}>
      <PlaceholderContainer>
        <div className="icon">
          <FontAwesomeIcon icon="plus" />
        </div>
        <div className="main-text">Twój przedmiot tutaj</div>
      </PlaceholderContainer>
    </Link>
  )
}

const PromotedSection = () => {
  return (
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
}

export default PromotedSection
