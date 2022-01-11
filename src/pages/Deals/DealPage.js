import React, { useState, useEffect } from "react"
import styled from "styled-components/macro"

import { LinkButton, ButtonContainer } from "../../components/Button"
import { SmallTextBlock } from "../../components/StyledComponents"
import LoadingSpinner from "../../components/LoadingSpinner"
import { PageContainer } from "../../components/Containers"
import ImageGallery from "../../components/ImageGallery"
import Share from "../../components/Share"
import { LayoutManager, Sidebar, Main } from "../../components/LayoutManager"
import { ThematicGroup } from "../../components/ThematicGroup"
import { SmallDealCard } from "../../components/Cards"
import {
  Header,
  DetailsContainer,
  Brands,
  Description,
  ItemContainer,
  InfoContainer,
  MiscBar,
} from "../../components/ItemDetails"

import { useFirebase } from "../../hooks"
import { CONST } from "../../constants"
import PageNav from "../../components/PageNav"

const OuterContainer = styled.div`
  @media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
    margin-top: calc(-1 * var(--page-header-margin));
  }
`

const Value = styled.div`
  font-size: var(--fs-l);
  color: var(--black25);
  font-weight: bold;
`

const DisclaimerContainer = styled.div`
  font-size: var(--fs-xs);
  color: var(--gray0);
  text-transform: uppercase;
  a {
    color: var(--black0);
  }
`

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
              <Brands designers={deal.designers} />
            </DetailsContainer>

            {deal.description && (
              <Description>
                <SmallTextBlock>Info</SmallTextBlock>
                <div className="content">{deal.description}</div>
              </Description>
            )}

            <ButtonContainer
              noMargin
              vertical
              css={`
                margin-bottom: var(--spacing3);
              `}
            >
              {/* TODO: make this button functional */}
              <LinkButton to={deal.link} primary fullWidth big external>
                Idź do okazji
              </LinkButton>
            </ButtonContainer>

            {/* TODO: add affiliate link disclaimer */}
            <DisclaimerContainer>PLACEHOLDER</DisclaimerContainer>
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
