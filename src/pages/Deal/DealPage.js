import { useState, useEffect } from "react"

import HelmetBasics from "../../components/HelmetBasics"
import { LinkButton, ButtonContainer } from "../../components/Button"
import { SmallTextBlock } from "../../components/StyledComponents"
import LoadingSpinner from "../../components/LoadingSpinner"
import { PageContainer } from "../../components/Containers"
import ImageGallery from "../../components/ImageGallery"
import Share from "../../components/Share"
import { LayoutManager, Sidebar, Main } from "../../components/LayoutManager"
import { ThematicGroup } from "../../components/ThematicGroup"
import { SmallDealCard } from "../../components/Cards"
import PageNav from "../../components/PageNav"
import {
  Header,
  DetailsContainer,
  Description,
  ItemContainer,
  InfoContainer,
  MiscBar,
} from "../../components/ItemDetails"

import { useFirebase } from "../../hooks"
import { CONST } from "../../constants"
import { OuterContainer, Value } from "./DealPage.styles"

const DealPage = ({ match }) => {
  const firebase = useFirebase()
  const [deal, setDeal] = useState(null)

  const id = match.params.id

  useEffect(() => {
    const getDeal = async () => {
      const snap = await firebase.deal(id).get()

      if (!snap.exists) {
        throw Error("Nie znaleziono")
      }

      setDeal(snap.data())
    }

    getDeal()
  }, [id, firebase])

  if (!deal) {
    return <LoadingSpinner />
  }

  // const formattedDesigners = formatDesigners(deal.designers)

  const similarFilters = `NOT id:${deal.id}`

  return (
    <OuterContainer>
      <HelmetBasics title={deal.title} />
      <PageContainer>
        <PageNav
          breadcrumbs={[
            ["Dropy", "DEALS"],
            [deal.title, "DEAL_DETAILS", { id: deal.id }],
          ]}
          noMargin
        />
        <ItemContainer>
          <ImageGallery storageRefs={[deal.imageRef]} lightboxTitle={deal.title} />
          <InfoContainer>
            <Header name={deal.title} designers={deal.designers} />
            <DetailsContainer>
              <Value>{deal.value}</Value>
              {/* <Brands designers={deal.designers} /> */}
            </DetailsContainer>

            {deal.description && (
              <Description>
                <SmallTextBlock>Info</SmallTextBlock>
                <div className="content">{deal.description}</div>
              </Description>
            )}

            <ButtonContainer noMargin vertical style={{ marginBottom: "var(--spacing3)" }}>
              <LinkButton to={deal.link} primary fullWidth big external>
                Idź do okazji
              </LinkButton>
            </ButtonContainer>

            {/* TODO: add affiliate link disclaimer */}
            {/* <DisclaimerContainer>PLACEHOLDER</DisclaimerContainer> */}
          </InfoContainer>
        </ItemContainer>
      </PageContainer>
      <MiscBar>
        <div className="group">
          <div className="group-name">Udostępnij</div>
          <Share />
        </div>
      </MiscBar>
      <PageContainer>
        <LayoutManager>
          <Main>
            <ThematicGroup
              index={CONST.DEALS_ALGOLIA_INDEX}
              title="Więcej okazji"
              filters={similarFilters}
              component={SmallDealCard}
              limit={3}
              ignoreArchivedStatus
            />
          </Main>
          <Sidebar availableElements={[{ component: () => <div />, title: "Placeholder" }]} />
        </LayoutManager>
      </PageContainer>
    </OuterContainer>
  )
}

export default DealPage
