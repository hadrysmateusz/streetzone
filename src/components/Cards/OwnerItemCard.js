import { useState, useContext, memo } from "react"
import moment from "moment"
import { Link } from "react-router-dom"
import { withBreakpoints } from "react-breakpoints"

import { Button, ButtonContainer, LoaderButton } from "../Button"
import InfoItem from "../InfoItem"
import { SmallTextBlock } from "../StyledComponents"
import DeleteItemButton from "../DeleteItemButton"
import { SearchWrapperContext } from "../InstantSearchWrapper"
import FirebaseImage from "../FirebaseImage"

import { translateCondition } from "../../constants/itemSchema"
import promotingTiers from "../../constants/promotingTiers"
import { useFlash, useFirebase } from "../../hooks"
import { itemDataHelpers, route } from "../../utils"

import {
  ActionsContainer,
  DescriptionContainer,
  DetailsContainer,
  InfoContainer,
  Name,
  OuterContainer,
  OuterDetailsContainer,
  StatusContainer,
  StyledLearnMoreLink,
} from "./OwnerItemCard.styles"
import { TopContainer } from "./Common.styles"
import { Designers } from "./Common"

const { formatPrice, formatSize } = itemDataHelpers

const PromoteStatus = ({ promotingLevel, promotedUntil }) => {
  const numDaysLeft = moment(promotedUntil).diff(Date.now(), "days")
  const diff = moment(promotedUntil).diff(moment())
  const timeLeft = promotedUntil ? moment.duration(diff).humanize() : "Brak"
  const hasTimeLeft = numDaysLeft > 0
  const promotingType = hasTimeLeft ? promotingTiers[promotingLevel] : "Brak"

  return (
    <StatusContainer>
      <div>
        Poziom promowania: <b>{promotingType}</b>
      </div>
      <div>
        Pozostało promowania: <b>{timeLeft}</b>
      </div>
    </StatusContainer>
  )
}

const RefreshStatus = ({ refreshedAt, createdAt, bumps }) => {
  const remainingBumps = bumps || "Brak"
  const wasRefreshed = refreshedAt && createdAt !== refreshedAt
  const lastRefreshed = wasRefreshed ? moment().to(refreshedAt) : "Nigdy"

  return (
    <StatusContainer>
      <div>
        Ostatnio odświeżano: <b>{lastRefreshed}</b>
      </div>
      <div>
        Pozostało odświeżeń: <b>{remainingBumps}</b>
      </div>
    </StatusContainer>
  )
}

const Description = ({ children }) => (
  <>
    <SmallTextBlock>Opis</SmallTextBlock>
    <DescriptionContainer>{children}</DescriptionContainer>
  </>
)

const LearnMore = () => (
  <StyledLearnMoreLink to={route("PROMOTING_INFO")}>
    Poznaj korzyści promowania i odświeżania
  </StyledLearnMoreLink>
)

const EditButton = ({ id }) => (
  <Button fullWidth as={Link} to={route("EDIT_ITEM", { id })}>
    Edytuj
  </Button>
)

const RefreshButton = ({ id, bumpsLeft }) => {
  const flashMessage = useFlash()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const firebase = useFirebase()
  const searchContext = useContext(SearchWrapperContext)
  const { refresh } = searchContext

  const hasBumps = bumpsLeft && +bumpsLeft > 0

  const refreshItem = async () => {
    // If already is refreshing, exit
    if (isRefreshing) return

    // Exit if no bumps left
    // TODO: show modal or sth to encourage buying more
    if (!hasBumps) return

    setIsRefreshing(true)
    try {
      await firebase.item(id).update({ refreshedAt: Date.now(), bumps: bumpsLeft - 1 })
    } catch (err) {
      throw err
    } finally {
      refresh()
      setIsRefreshing(false)
    }
  }

  const onClick = async () => {
    try {
      await refreshItem()

      // show flash message
      flashMessage({
        type: "success",
        text: "Odświeżono",
        details: "Odśwież stronę za kilka sekund by zobaczyć zmiany",
        ttl: 6000,
      })
    } catch (err) {
      // TODO: error handling
      flashMessage({ type: "error", text: "Wystąpił błąd" })
    }
  }

  return (
    <LoaderButton
      fullWidth
      text="Odśwież"
      loadingText="Odświeżanie..."
      onClick={onClick}
      disabled={!hasBumps}
      isLoading={isRefreshing}
    />
  )
}

const PromoteButton = ({ id }) => {
  return (
    <Button accent fullWidth as={Link} to={route("ITEM_PROMOTE", { id })}>
      Promuj
    </Button>
  )
}

const OwnerItemCardDumb = memo(
  ({
    id,
    condition,
    designers,
    price,
    size,
    name,
    description,
    category,
    createdAt,
    refreshedAt,
    promotedUntil,
    promotingLevel,
    bumps,
    isMobile,
    mainImageIndex,
    attachments,
  }) => {
    let conditionObj = translateCondition(condition)
    let formattedPrice = formatPrice(price)
    let formattedSize = formatSize(size)

    return (
      <OuterContainer>
        {!isMobile && <FirebaseImage storageRef={attachments[mainImageIndex]} size="M" />}
        <Link to={route("ITEM_DETAILS", { id })} style={{ minWidth: "0", minHeight: "0" }}>
          <InfoContainer>
            <TopContainer>
              <div>{category}</div>
              <Designers value={designers} />
            </TopContainer>

            <Name>{name}</Name>

            <OuterDetailsContainer>
              {isMobile && (
                <div className="mobile-image-container">
                  <FirebaseImage storageRef={attachments[mainImageIndex]} size="M" />
                </div>
              )}

              <DetailsContainer>
                <InfoItem name="Cena">{formattedPrice}</InfoItem>
                <InfoItem name="Stan">{conditionObj.displayValue}</InfoItem>
                <InfoItem name="Rozmiar">{formattedSize}</InfoItem>
              </DetailsContainer>
            </OuterDetailsContainer>

            <Description>{description}</Description>
          </InfoContainer>
        </Link>

        <ActionsContainer>
          <PromoteButton id={id} />
          <PromoteStatus promotingLevel={promotingLevel} promotedUntil={promotedUntil} />
          <RefreshButton id={id} bumpsLeft={bumps} />
          <RefreshStatus bumps={bumps} refreshedAt={refreshedAt} createdAt={createdAt} />
          <LearnMore />
          <ButtonContainer noMargin>
            <EditButton id={id} />
            <DeleteItemButton id={id} />
          </ButtonContainer>
        </ActionsContainer>
      </OuterContainer>
    )
  }
)

const OwnerItemCard = withBreakpoints(({ currentBreakpoint, ...rest }) => {
  const isMobile = +currentBreakpoint < 2
  return <OwnerItemCardDumb isMobile={isMobile} {...rest} />
})

export default OwnerItemCard
