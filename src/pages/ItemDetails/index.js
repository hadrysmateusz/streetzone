import React, { Component } from "react"
import { Link } from "react-router-dom"
import { compose } from "recompose"
import { InstantSearch, Configure } from "react-instantsearch-dom"
import moment from "moment"

import DataDisplay from "../../components/DataDisplay"
import ImageGallery from "../../components/ImageGallery"
import { withFirebase } from "../../components/Firebase"
import { withAuthentication } from "../../components/UserSession"
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
import {
	ItemContainer,
	InfoContainer,
	Description,
	Designers,
	SectionContainer
} from "./StyledComponents"
// import { HeartButton } from "../SaveButton"
import formatDesigners from "../../utils/formatDesigners"
import formatPrice from "../../utils/formatPrice"
import formatSize from "../../utils/formatSize"
import { Flex } from "rebass"

class ItemDetailsPage extends Component {
	state = {
		isLoading: true,
		item: null,
		isDeleting: false
	}

	componentDidUpdate = async (prevProps) => {
		if (this.props.location !== prevProps.location) {
			this.setState({ isLoading: true })

			// Get item from database
			const item = await this.getItem()

			this.setState({ item, isLoading: false })
		}
	}

	getItem = () => {
		return this.props.firebase.getItemData(this.props.match.params.id)
	}

	componentDidMount = async () => {
		// Get item from database
		const item = await this.getItem()

		this.setState({ item, isLoading: false })
	}

	deleteItem = async () => {
		// TODO: better confirmation dialog
		let confirmation = window.confirm("Czy napewno chcesz usunąć ten przedmiot?")

		if (confirmation) {
			this.setState({ isDeleting: true })
			try {
				const firebase = this.props.firebase
				const itemId = this.props.match.params.id

				// Fetch current user's items from database
				const currentUserSnapshot = await firebase.currentUser().get()
				const oldItems = currentUserSnapshot.data().items

				// Delete the item
				await firebase.item(itemId).delete()

				// Remove the deleted item from user's items
				const items = oldItems.filter((item) => item !== itemId)
				await firebase.currentUser().update({ items })

				this.props.history.push("/")
				return
			} catch (e) {
				this.setState({ isDeleting: false })
				alert("Usuwanie nie powiodło się")
			}
		}
	}

	render() {
		const { item, isLoading, isDeleting } = this.state
		const { authUser } = this.props
		let isAuthorized

		if (item && authUser) {
			const ownerId = item.userId
			const authUserId = this.props.authUser.uid
			isAuthorized = authUserId && ownerId === authUserId
		}

		let conditionObj
		let formattedDesigners
		let formattedPrice
		let formattedSize
		if (item && !isLoading) {
			conditionObj = translateCondition(item.condition)
			formattedDesigners = formatDesigners(item.designers)
			formattedPrice = formatPrice(item.price)
			formattedSize = formatSize(item.size)
		}

		return item && !isLoading ? (
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
											<Button as={Link} to={`/e/${item.itemId}`} fullWidth>
												Edytuj
											</Button>
											<LoaderButton
												isLoading={isDeleting}
												text="Usuń"
												loadingText="Usuwanie..."
												onClick={this.deleteItem}
												fullWidth
											/>
										</ButtonContainer>
									</>
								) : (
									<ButtonContainer noMargin>
										<Button primary fullWidth>
											Kontakt
										</Button>
										<Button fullWidth>Zapisz</Button>
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
						indexName="dev_items"
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
						indexName="dev_items"
					>
						<Configure hitsPerPage={3} />
						<VirtualMenu attribute="userId" defaultRefinement={item.userId} />
						<AlgoliaMiniHits />
					</InstantSearch>
				</GrayContainer>
			</>
		) : isLoading ? (
			<LoadingSpinner />
		) : (
			<EmptyState text="Nie znaleziono przedmiotu, być może został usunięty." />
		)
	}
}

export default compose(
	withAuthentication,
	withFirebase
)(ItemDetailsPage)
