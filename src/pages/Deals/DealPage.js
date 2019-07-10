import React, { useState, useEffect } from "react"
import moment from "moment"
import styled from "styled-components/macro"

import { LinkButton, ButtonContainer } from "../../components/Button"
import { SmallTextBlock } from "../../components/StyledComponents"
import LoadingSpinner from "../../components/LoadingSpinner"
import { PageContainer } from "../../components/Containers"
import ImageGallery from "../../components/ImageGallery"
import Share from "../../components/Share"
import Tags from "../../components/Tags"
import { LayoutManager, Sidebar, Main } from "../../components/LayoutManager"
import { ThematicGroup } from "../../components/ThematicGroup"
import { SmallDealCard, SmallDropCard } from "../../components/Cards"
import {
	Header,
	DetailsContainer,
	Brands,
	Description,
	ItemContainer,
	InfoContainer,
	MiscBar
} from "../../components/ItemDetails"

import { useFirebase } from "../../hooks"
import { CONST } from "../../constants"

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
		<>
			<PageContainer>
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
							<LinkButton to={deal.link} primary fullWidth big>
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
					<Sidebar
						availableElements={[{ component: () => <div />, title: "Placeholder" }]}
					/>
				</LayoutManager>
			</PageContainer>
		</>
	)
}

export default DealPage
