import React, { useState, useEffect } from "react"
import moment from "moment"
import styled from "styled-components/macro"

import Button, { ButtonContainer, LinkButton } from "../../../components/Button"
import { SmallTextBlock } from "../../../components/StyledComponents"
import { SaveButton, SaveIconButton } from "../../../components/SaveButton"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { PageContainer } from "../../../components/Containers"
import ImageGallery from "../../../components/ImageGallery"
import PageNav from "../../../components/PageNav"
import Share from "../../../components/Share"
import InfoItem from "../../../components/InfoItem"
import { LayoutManager, Sidebar, Main } from "../../../components/LayoutManager"
import { ThematicGroup } from "../../../components/ThematicGroup"
import { SmallDropCard } from "../../../components/Cards"
import EmptyState from "../../../components/EmptyState/new"
import {
	Header,
	DetailsContainer,
	Brands,
	Description,
	ItemContainer,
	InfoContainer,
	MiscBar
} from "../../../components/ItemDetails"
import HelmetBasics from "../../../components/HelmetBasics"

import { useFirebase } from "../../../hooks"
import { dateFormat } from "../../../utils/formatting/formatDropData"
import { itemDataHelpers, route } from "../../../utils"
import { CONST } from "../../../constants"

import WhereToBuyModal from "./WhereToBuyModal"

const { formatDesigners } = itemDataHelpers

const DisclaimerContainer = styled.div`
	font-size: var(--fs-xs);
	color: var(--gray0);
	text-transform: uppercase;
	a {
		color: var(--black0);
	}
`

const DropDetailsPage = ({ match, history, location }) => {
	const firebase = useFirebase()
	const [drop, setDrop] = useState(null)
	const [error, setError] = useState(null)

	const dropId = match.params.id

	useEffect(() => {
		const getDrop = async () => {
			const snap = await firebase.drop(dropId).get()

			if (!snap.exists) {
				setError(true)
			}

			setDrop(snap.data())
		}

		getDrop()
	}, [dropId, firebase])

	const isLoading = !error && !drop

	let isTimeKnown, dropsAt, dropsAtDate, dropsAtTime, designers, similarFilters

	if (drop) {
		designers = formatDesigners(drop.designers)
		isTimeKnown = drop.dropsAtString && drop.dropsAtString.length > 9
		dropsAt = moment(drop.dropsAtString, dateFormat)
		dropsAtDate = dropsAt.format("LL")
		dropsAtTime = dropsAt.format("HH:mm")
		similarFilters = `NOT id:${drop.id}`
	}

	return error ? (
		<>
			<HelmetBasics title="Nie znaleziono" />
			<EmptyState header="Nie znaleziono">
				Nie znaleziono takiego dropu
				<ButtonContainer>
					<LinkButton to={route("DROPS_SECTION", { id: "newest" })}>
						Zobacz wszystkie dropy
					</LinkButton>
				</ButtonContainer>
			</EmptyState>
		</>
	) : isLoading ? (
		<LoadingSpinner />
	) : (
		<>
			<HelmetBasics title={drop.name} />
			<PageContainer>
				<PageNav breadcrumbs={[["Dropy", "DROPS_SECTION", { id: "newest" }]]} noMargin />
				<ItemContainer>
					<ImageGallery
						storageRefs={drop.attachments}
						lightboxTitle={
							<div>
								<b>{drop.name}</b> - {designers}{" "}
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
							<WhereToBuyModal links={drop.buyAt}>
								{({ open }) => (
									<Button primary fullWidth big onClick={open}>
										Gdzie kupić
									</Button>
								)}
							</WhereToBuyModal>

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
				{/* <div className="group">
					<div className="group-name">Tagi</div>
					<Tags tags={drop.tags} />
				</div> */}
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
