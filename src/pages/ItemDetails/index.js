import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { css } from "styled-components/macro"

import HelmetBasics from "../../components/HelmetBasics"
import Button, { ButtonContainer } from "../../components/Button"
import DeleteItemButton from "../../components/DeleteItemButton"
import { SmallTextBlock } from "../../components/StyledComponents"
import { SaveButton } from "../../components/SaveButton"
import LoadingSpinner from "../../components/LoadingSpinner"
import { PageContainer } from "../../components/Containers"
import ImageGallery from "../../components/ImageGallery"
import UserPreview from "../../components/UserPreview"
import ItemNotFound from "../../components/ItemNotFound"
import PageNav from "../../components/PageNav"
import InfoItem from "../../components/InfoItem"
import ContactModal from "../../components/ContactModal"
import { LayoutManager, Sidebar, Main } from "../../components/LayoutManager"
import { ThematicGroup } from "../../components/ThematicGroup"
import { SmallItemCard } from "../../components/Cards"
import Share from "../../components/Share"
import {
	Header,
	DetailsContainer,
	DatesContainer,
	Brands,
	Description,
	ItemContainer,
	InfoContainer,
	MiscBar
} from "../../components/ItemDetails"

import { useFirebase, useAuthentication } from "../../hooks"
import { translateCondition } from "../../constants/item_schema"
import { CONST } from "../../constants"
import { route, itemDataHelpers } from "../../utils"

const { formatDesigners, formatPrice, formatSize } = itemDataHelpers

const ItemDetailsPage = ({ match, history }) => {
	const firebase = useFirebase()
	const [authUser, isAuthenticated] = useAuthentication(true)
	const [isLoading, setIsLoading] = useState(true)
	const [item, setItem] = useState(null)

	const itemId = match.params.id

	useEffect(() => {
		const getItem = async () => {
			setIsLoading(true)
			const foundItem = await firebase.getItemData(itemId)
			setItem(foundItem)
			setIsLoading(false)
		}

		getItem()
	}, [itemId, isAuthenticated, firebase])

	if (isLoading) return <LoadingSpinner />
	if (!item) {
		return <ItemNotFound />
	}

	const isAuthorized = authUser && authUser.uid === item.userId

	const conditionObj = translateCondition(item.condition)
	const formattedPrice = formatPrice(item.price)
	const formattedSize = formatSize(item.size)
	const formattedDesigners = formatDesigners(item.designers)

	const similarFilters = `NOT id:${item.id} AND category:${
		item.category
	} AND (${item.designers.map((d) => `designers:${d}`).join(" OR ")})`

	return (
		<>
			<HelmetBasics title={item.name + " - Tablica"} />
			<PageContainer>
				{/* TODO: make the algolia encoding work with route helper, for this to work */}
				<PageNav
					breadcrumbs={[["Kupuj", "MARKETPLACE"], [item.category, "MARKETPLACE"]]}
				/>
				<ItemContainer>
					<ImageGallery
						storageRefs={item.attachments}
						showThumbnails
						lightboxTitle={
							<div>
								<b>{item.name}</b> - {formattedDesigners}{" "}
							</div>
						}
					/>
					<InfoContainer>
						<Header name={item.name} designers={item.designers} />
						<DetailsContainer>
							<InfoItem size="m" name="Cena">
								{formattedPrice}
							</InfoItem>
							<InfoItem size="m" name="Stan">
								{conditionObj.displayValue}
							</InfoItem>
							<InfoItem size="m" name="Rozmiar">
								{formattedSize}
							</InfoItem>
							<Brands designers={item.designers} />
						</DetailsContainer>

						<Description>
							<SmallTextBlock>Opis</SmallTextBlock>
							<div className="content">{item.description}</div>
						</Description>

						<DatesContainer>
							<SmallTextBlock>
								<b>Dodano&nbsp;</b>
								{moment().to(item.createdAt)}
							</SmallTextBlock>
							{item.editedAt && (
								<SmallTextBlock>
									<b>Edytowano&nbsp;</b>
									{moment().to(item.editedAt)}
								</SmallTextBlock>
							)}
						</DatesContainer>

						<ButtonContainer
							noMargin
							vertical
							css={css`
								margin-bottom: var(--spacing3);
							`}
						>
							{isAuthorized ? (
								<>
									<Button
										accent
										fullWidth
										as={Link}
										to={route("ITEM_PROMOTE", { id: item.id })}
									>
										Promuj
									</Button>

									<Button as={Link} to={route("EDIT_ITEM", { id: item.id })} fullWidth>
										Edytuj
									</Button>

									<DeleteItemButton id={item.id} />
								</>
							) : (
								<>
									<ContactModal userId={item.userId} subject={item.name}>
										{({ open }) => (
											<Button primary fullWidth big onClick={open}>
												Kontakt
											</Button>
										)}
									</ContactModal>

									<SaveButton type="item" id={item.id} fullWidth />
								</>
							)}
						</ButtonContainer>

						{!isAuthorized && <UserPreview id={item.userId} />}
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
							index={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
							title="Podobne przedmioty"
							filters={similarFilters}
							component={SmallItemCard}
							limit={3}
						/>
						<ThematicGroup
							index={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
							title="Inne przedmioty tego użytkownika"
							filters={`NOT id:${item.id} AND userId:${item.userId}`}
							component={SmallItemCard}
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

export default ItemDetailsPage
