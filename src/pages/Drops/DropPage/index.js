import React, { useState, useEffect } from "react"
import moment from "moment"
import styled from "styled-components/macro"

import Button, { ButtonContainer } from "../../../components/Button"
import { SmallTextBlock } from "../../../components/StyledComponents"
import { SaveButton, SaveIconButton } from "../../../components/SaveButton"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { PageContainer } from "../../../components/Containers"
import ImageGallery from "../../../components/ImageGallery"
import PageNav from "../../../components/PageNav"
import Share from "../../../components/Share"
import Tags from "../../../components/Tags"
import InfoItem from "../../../components/InfoItem"
import { LayoutManager, Sidebar, Main } from "../../../components/LayoutManager"
import { ThematicGroup } from "../../../components/ThematicGroup"
import { SmallDropCard } from "../../../components/Cards"
import {
	Header,
	DetailsContainer,
	Brands,
	Description,
	ItemContainer,
	InfoContainer,
	MiscBar
} from "../../../components/ItemDetails"

import { useFirebase } from "../../../hooks"
import { dateFormat } from "../../../utils/formatting/formatDropData"
import { itemDataHelpers } from "../../../utils"
import { CONST } from "../../../constants"

const { formatDesigners } = itemDataHelpers

const DisclaimerContainer = styled.div`
	font-size: var(--fs-xs);
	color: var(--gray0);
	text-transform: uppercase;
	a {
		color: var(--black0);
	}
`

const DropDetailsPage = ({ match, history }) => {
	const firebase = useFirebase()
	const [drop, setDrop] = useState(null)

	const dropId = match.params.id

	useEffect(() => {
		const getDrop = async () => {
			const snap = await firebase.drop(dropId).get()

			if (!snap.exists) {
				throw Error("Nie znaleziono")
			}

			setDrop(snap.data())
		}

		getDrop()
	}, [dropId])

	if (!drop) {
		return <LoadingSpinner />
	}

	const formattedDesigners = formatDesigners(drop.designers)

	const isTimeKnown = drop.dropsAtString && drop.dropsAtString.length > 9

	const dropsAt = moment(drop.dropsAtString, dateFormat)
	const dropsAtDate = dropsAt.format("LL")
	const dropsAtTime = dropsAt.format("HH:mm")

	const similarFilters = `NOT id:${drop.id}`

	return (
		<>
			<PageContainer>
				{/* TODO: make the algolia encoding work with route helper, for this to work */}
				<PageNav breadcrumbs={[["Dropy", "DROPS"]]} noMargin />
				<ItemContainer>
					<ImageGallery
						storageRefs={drop.attachments}
						lightboxTitle={
							<div>
								<b>{drop.name}</b> - {formattedDesigners}{" "}
							</div>
						}
					/>
					<InfoContainer>
						<Header name={drop.name} designers={drop.designers} />
						<DetailsContainer>
							<InfoItem name="Cena">{drop.price || "Brak informacji"}</InfoItem>
							<Brands designers={drop.designers} />
						</DetailsContainer>

						<DetailsContainer>
							<InfoItem name="Data Dropu">{dropsAtDate}</InfoItem>
							{isTimeKnown && <InfoItem name="Data Dropu">{dropsAtTime}</InfoItem>}
							<SaveIconButton type="drop" id={drop.id} scale={1.6} />
						</DetailsContainer>

						{drop.description && (
							<Description>
								<SmallTextBlock>Opis</SmallTextBlock>
								<div className="content">{drop.description}</div>
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
							<Button primary fullWidth big>
								Gdzie kupić
							</Button>
							<SaveButton type="drop" id={drop.id} />
						</ButtonContainer>

						<DisclaimerContainer>
							Podane informacje mogą ulec zmianie. Jeśli któraś z informacji jest
							nieaktualna, daj nam znać na{" "}
							<a href={`mailto:${CONST.CONTACT_EMAIL}`}>{CONST.CONTACT_EMAIL}</a> Możesz
							również obserwować dropa by otrzymywać update'y i przypomnienia
						</DisclaimerContainer>
					</InfoContainer>
				</ItemContainer>
			</PageContainer>
			<MiscBar>
				<div className="group">
					<div className="group-name">Udostępnij</div>
					<Share />
				</div>
				<div className="group">
					<div className="group-name">Tagi</div>
					<Tags tags={drop.tags} />
				</div>
			</MiscBar>
			<PageContainer>
				<LayoutManager>
					<Main>
						<ThematicGroup
							index={CONST.BLOG_DROP_ALGOLIA_INDEX}
							title="Więcej dropów"
							filters={similarFilters}
							component={SmallDropCard}
							limit={3}
						/>
						{/* <ThematicGroup
							index={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
							title="Inne przedmioty tego użytkownika"
							filters={`NOT id:${item.id} AND userId:${item.userId}`}
							component={SmallItemCard}
							limit={3}
						/> */}
					</Main>
					<Sidebar
						availableElements={[{ component: () => <div />, title: "Placeholder" }]}
					/>
				</LayoutManager>
			</PageContainer>
		</>
	)
}

export default DropDetailsPage
