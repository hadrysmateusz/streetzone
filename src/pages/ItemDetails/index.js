import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import styled from "styled-components/macro" // for css prop

import Button, { LoaderButton, ButtonContainer } from "../../components/Button"
import { SmallTextBlock } from "../../components/StyledComponents"
import { SaveButton, TYPE } from "../../components/SaveButton"
import LoadingSpinner from "../../components/LoadingSpinner"
import { PageContainer } from "../../components/Containers"
import ImageGallery from "../../components/ImageGallery"
import UserPreview from "../../components/UserPreview/new"
import EmptyState from "../../components/EmptyState"
import PageNav from "../../components/PageNav"
import InfoItem from "../../components/InfoItem"
import ContactModal from "../../components/ContactModal"
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
import { route, itemDataHelpers } from "../../utils"

const { formatDesigners, formatPrice, formatSize } = itemDataHelpers

const ItemDetailsPage = ({ match, history }) => {
	const firebase = useFirebase()
	const [authUser, isAuthenticated] = useAuthentication(true)
	const [isDeleting, setIsDeleting] = useState(false)
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

	const deleteItem = async () => {
		setIsDeleting(true)

		// TODO: better confirmation dialog
		let confirmation = window.confirm("Czy napewno chcesz usunąć ten przedmiot?")

		if (confirmation) {
			try {
				const oldItems = authUser.items

				// Delete the item
				await firebase.item(itemId).delete()

				// Remove the deleted item from user's items
				const items = oldItems.filter((item) => item !== itemId)
				await firebase.currentUser().update({ items })

				history.push(route("MARKETPLACE"))
				return
			} catch (e) {
				alert("Usuwanie nie powiodło się")
			}
		}

		setIsDeleting(false)
	}

	if (isLoading) return <LoadingSpinner />
	if (!item) {
		return <EmptyState text="Nie znaleziono przedmiotu, być może został usunięty." />
	}

	const isAuthorized = authUser && authUser.uid === item.userId

	const conditionObj = translateCondition(item.condition)
	const formattedPrice = formatPrice(item.price)
	const formattedSize = formatSize(item.size)
	const formattedDesigners = formatDesigners(item.designers)

	return (
		<>
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
							css={`
								margin-bottom: var(--spacing3);
							`}
						>
							{isAuthorized ? (
								<>
									<Button accent fullWidth>
										Promuj
									</Button>

									<Button as={Link} to={route("EDIT_ITEM", { id: item.id })} fullWidth>
										Edytuj
									</Button>

									<LoaderButton
										isLoading={isDeleting}
										text="Usuń"
										loadingText="Usuwanie..."
										onClick={deleteItem}
										fullWidth
									/>
								</>
							) : (
								<>
									<ContactModal userId={item.userId}>
										{({ open }) => (
											<Button primary fullWidth big onClick={open}>
												Kontakt
											</Button>
										)}
									</ContactModal>

									<SaveButton
										fullWidth
										text="Zapisz"
										savedText="Zapisano"
										type={TYPE.ITEM}
										id={item.id}
									/>
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
		</>
	)
}

export default ItemDetailsPage

/* <GrayContainer padded>
	<TextBlock uppercase>Podobne przedmioty</TextBlock>
	<InstantSearch
		appId={process.env.REACT_APP_APP_ID}
		apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
		indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
	>
		<Configure hitsPerPage={3} />
		<VirtualRefinementList
			attribute="designers"
			defaultRefinement={item.designers}
		/>
		<VirtualMenu attribute="category" defaultRefinement={item.category} />
		<AlgoliaScrollableHits />
	</InstantSearch>
	<TextBlock uppercase>Inne przedmioty sprzedającego</TextBlock>
	<InstantSearch
		appId={process.env.REACT_APP_APP_ID}
		apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
		indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
	>
		<Configure hitsPerPage={3} />
		<VirtualMenu attribute="userId" defaultRefinement={item.userId} />
		<AlgoliaScrollableHits />
	</InstantSearch>
</GrayContainer> */
