import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { InstantSearch, Configure } from "react-instantsearch-dom"
import moment from "moment"

import DataDisplay from "../../components/DataDisplay"
import ImageGallery from "../../components/ImageGallery"

import LoadingSpinner from "../../components/LoadingSpinner"
import Button, {
	LoaderButton,
	ButtonContainer,
	IconButton
} from "../../components/Button"
import EmptyState from "../../components/EmptyState"
import UserPreview from "../../components/UserPreview"
import { translateCondition } from "../../constants/item_schema"
import { PageContainer, GrayContainer } from "../../components/Containers"
import { AlgoliaMiniHits } from "../../components/Algolia/AlgoliaHits"
import { VirtualMenu, VirtualRefinementList } from "../../components/Algolia/Virtual"
import {
	TextBlock,
	SmallTextBlock,
	HorizontalContainer
} from "../../components/StyledComponents"
import { ItemContainer, InfoContainer, SectionContainer } from "./StyledComponents"
import { SaveButton, TYPE } from "../../components/SaveButton"
import formatDesigners from "../../utils/formatDesigners"
import formatPrice from "../../utils/formatPrice"
import formatSize from "../../utils/formatSize"
import { CONST, ROUTES } from "../../constants"
import useFirebase from "../../hooks/useFirebase"
import useAuthentication from "../../hooks/useAuthentication"

const ItemDetailsPage = ({ match, history }) => {
	const firebase = useFirebase()
	const authUser = useAuthentication()
	const [isDeleting, setIsDeleting] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [item, setItem] = useState(null)

	const itemId = match.params.id

	const getItem = async () => {
		setIsLoading(true)
		const foundItem = await firebase.getItemData(itemId)
		setItem(foundItem)
		setIsLoading(false)
	}

	useEffect(() => {
		getItem()
	}, [itemId, !!authUser])

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

				history.push(ROUTES.MARKETPLACE)
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
	const formattedDesigners = formatDesigners(item.designers)
	const formattedPrice = formatPrice(item.price)
	const formattedSize = formatSize(item.size)

	return (
		<>
			<PageContainer maxWidth={5}>
				<ItemContainer>
					<ImageGallery item={item} />
					<InfoContainer>
						<SectionContainer>
							<TextBlock uppercase size="l" bold>
								{item.designers && formattedDesigners}
							</TextBlock>
							<TextBlock size="m">{item.name}</TextBlock>
						</SectionContainer>

						<SectionContainer>
							<HorizontalContainer gap="3">
								<SmallTextBlock>
									<b>Dodano:&nbsp;</b>
									{moment(item.createdAt).format("D.M.YY o HH:mm")}
								</SmallTextBlock>
								<SmallTextBlock>
									<b>Edytowano:&nbsp;</b>
									{moment(item.createdAt).format("D.M.YY o HH:mm")}
								</SmallTextBlock>
							</HorizontalContainer>
							<DataDisplay>
								<tr>
									<th>Cena</th>
									<td>{formattedPrice}</td>
								</tr>
								<tr>
									<th>Rozmiar</th>
									<td>{formattedSize}</td>
								</tr>
								<tr>
									<th>Stan</th>
									<td>{conditionObj.displayValue}</td>
								</tr>
							</DataDisplay>

							{isAuthorized ? (
								<>
									<ButtonContainer>
										<Button accent fullWidth>
											Promuj
										</Button>
									</ButtonContainer>

									<ButtonContainer noMargin>
										<Button
											as={Link}
											to={ROUTES.EDIT_ITEM.replace(":id", item.id)}
											fullWidth
										>
											Edytuj
										</Button>
										<LoaderButton
											isLoading={isDeleting}
											text="Usuń"
											loadingText="Usuwanie..."
											onClick={deleteItem}
											fullWidth
										/>
									</ButtonContainer>
								</>
							) : (
								<ButtonContainer noMargin>
									<Button primary fullWidth>
										Kontakt
									</Button>
									<SaveButton
										fullWidth
										text="Zapisz"
										savedText="Zapisano"
										type={TYPE.ITEM}
										id={item.id}
									/>
									<IconButton icon="ellipsis-h" />
								</ButtonContainer>
							)}
						</SectionContainer>
						<SectionContainer>
							{!isAuthorized && <UserPreview id={item.userId} />}
							<TextBlock>{item.description}</TextBlock>
						</SectionContainer>
					</InfoContainer>
				</ItemContainer>
			</PageContainer>
			<GrayContainer padded>
				<TextBlock uppercase>Podobne przedmioty</TextBlock>
				<InstantSearch
					appId={process.env.REACT_APP_APP_ID}
					apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
					indexName={CONST.DEV_ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
				>
					<Configure hitsPerPage={3} />
					<VirtualRefinementList
						attribute="designers"
						defaultRefinement={item.designers}
					/>
					<VirtualMenu attribute="category" defaultRefinement={item.category} />
					<AlgoliaMiniHits />
				</InstantSearch>
				<TextBlock uppercase>Inne przedmioty sprzedającego</TextBlock>
				<InstantSearch
					appId={process.env.REACT_APP_APP_ID}
					apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
					indexName={CONST.DEV_ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
				>
					<Configure hitsPerPage={3} />
					<VirtualMenu attribute="userId" defaultRefinement={item.userId} />
					<AlgoliaMiniHits />
				</InstantSearch>
			</GrayContainer>
		</>
	)
}

export default ItemDetailsPage
