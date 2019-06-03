import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import styled, { css } from "styled-components/macro"

import Button, { ButtonContainer } from "../../../components/Button"
import { TextBlock, SmallTextBlock } from "../../../components/StyledComponents"
import FollowButton from "../../../components/DropCountdown/FollowButton"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { PageContainer } from "../../../components/Containers"
import ImageGallery from "../../../components/ImageGallery"
import { Image } from "../../../components/Image"
import PageNav from "../../../components/PageNav"

import { useFirebase, useDesigner } from "../../../hooks"
import { encodeURL } from "../../../utils/algoliaURLutils"
import { dateFormat } from "../../../utils/formatting/formatDropData"
import { route, itemDataHelpers } from "../../../utils"
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

const ItemContainer = styled.div`
	position: relative;
	display: grid;
	max-width: 100%;
	height: 100%;
	gap: var(--spacing3);
	grid-template-columns: 100%;
	@media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
		grid-template-rows: minmax(270px, 65vmin);
	}
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: 2fr minmax(340px, 1fr);
	}
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		gap: var(--spacing4);
	}
`

const InfoContainer = styled.div`
	flex: 0 0 100%;
	background: white;
	padding-bottom: var(--spacing5);
`

const HeaderContainer = styled.div`
	.designers {
		font-size: var(--fs-xs);
		text-transform: uppercase;
		color: var(--gray0);
	}
	.name {
		font-size: var(--fs-l);
		color: var(--black0);
		font-weight: bold;
	}

	padding-bottom: var(--spacing1);
	border-bottom: 1px solid var(--gray75);
	margin-bottom: var(--spacing3);
`

const DetailsContainer = styled.div`
	display: flex;
	align-content: center;
	margin-bottom: var(--spacing3);

	> * + * {
		margin-left: var(--spacing3);
		@media (min-width: ${(p) => p.theme.breakpoints[4]}px) {
			margin-left: var(--spacing4);
		}
	}
`

const Description = styled.div`
	.content {
		color: var(--black25);
	}
	margin-bottom: var(--spacing3);
`

const BrandsContainer = styled.div`
	display: flex;
	align-content: center;
	justify-content: flex-end;
	margin-left: auto;
	> * + * {
		margin-left: var(--spacing2);
	}
`

const DesignerLink = ({ value, children }) => {
	return (
		<Link to={encodeURL({ designers: [value] }, route("MARKETPLACE"))}>{children}</Link>
	)
}

const Brands = ({ designers }) => {
	return (
		<BrandsContainer>
			{designers.map((designer) => (
				<Logo name={designer} key={designer} />
			))}
		</BrandsContainer>
	)
}

const Logo = ({ name }) => {
	const designer = useDesigner(name)

	return designer ? (
		<div
			css={css`
				width: 40px;
				height: 40px;
				border-radius: 50%;
				overflow: hidden;
				border: 1px solid var(--gray75);
			`}
		>
			<DesignerLink value={designer.label}>
				<Image url={designer.logoURL} title={designer.label} />
			</DesignerLink>
		</div>
	) : null
}

const InfoItem = ({ name, children }) => {
	return (
		<div>
			<SmallTextBlock>{name}</SmallTextBlock>
			<TextBlock bold>{children}</TextBlock>
		</div>
	)
}

const Header = ({ designers, name }) => {
	let formattedDesigners = formatDesigners(designers)

	return (
		<HeaderContainer>
			<div className="designers">{formattedDesigners}</div>
			<div className="name">{name}</div>
		</HeaderContainer>
	)
}

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

	return (
		<>
			<PageContainer>
				{/* TODO: make the algolia encoding work with route helper, for this to work */}
				<PageNav breadcrumbs={[["Dropy", "DROPS"]]} />
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
							<FollowButton id={drop.id} />
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
							<Button>
								<FollowButton id={drop.id} />
							</Button>
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
		</>
	)
}

export default DropDetailsPage
