import React, { Component } from "react"
import { Link } from "react-router-dom"
import { compose } from "recompose"
import { InstantSearch, Configure } from "react-instantsearch-dom"
import moment from "moment"

import DataDisplay from "../DataDisplay"
import ImageGallery from "../ImageGallery"
import { withFirebase } from "../Firebase"
import { withAuthentication } from "../UserSession"
import LoadingSpinner from "../LoadingSpinner"
import Button, { LoaderButton, ButtonContainer, IconButton } from "../Button"
import EmptyState from "../EmptyState"
import UserPreview from "../UserPreview"
import { translateCondition } from "../../constants/item_schema"
import { PageContainer, GrayContainer } from "../Containers"
import { AlgoliaMiniHits } from "../Algolia/AlgoliaHits"
import { VirtualMenu, VirtualRefinementList } from "../Algolia/Virtual"
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
import { Header4, TextBlock, Header3 } from "../StyledComponents"

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
		let isUserOwner

		if (item && authUser) {
			const ownerId = item.userId
			const authUserId = this.props.authUser.uid
			isUserOwner = authUserId && ownerId === authUserId
		}

		let conditionObj
		let formattedDesigners
		let formattedPrice
		if (item && !isLoading) {
			conditionObj = translateCondition(item.condition)
			formattedDesigners = formatDesigners(item.designers)
			formattedPrice = formatPrice(item.price)
		}

		return item && !isLoading ? (
			<>
				<PageContainer maxWidth={5}>
					<ItemContainer>
						<ImageGallery item={item} />
						<InfoContainer>
							<SectionContainer>
								<Header4 uppercase>
									{item.designers && <Designers>{formattedDesigners}</Designers>}
								</Header4>
								<TextBlock size="l">{item.name}</TextBlock>
							</SectionContainer>

							<SectionContainer>
								{/* <MoreInfo>
					<div>
					Dodano:{" "}
					<span>{moment(item.createdAt).format("D.M.YY o HH:mm")}</span>
					</div>
					<div>
					Edytowano:{" "}
					<span>{moment(item.createdAt).format("D.M.YY o HH:mm")}</span>
					</div>
					</MoreInfo> */}
								<DataDisplay>
									<tr>
										<th>Cena</th>
										<td>{formattedPrice}</td>
									</tr>
									<tr>
										<th>Rozmiar</th>
										<td>{item.size}</td>
									</tr>
									<tr>
										<th>Stan</th>
										<td>{conditionObj.displayValue}</td>
									</tr>
								</DataDisplay>

								<ButtonContainer>
									{isUserOwner ? (
										<>
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
										</>
									) : (
										<>
											<Button primary fullWidth>
												Kontakt
											</Button>
											<Button fullWidth>Zapisz</Button>
											<IconButton icon="ellipsis-h" />
										</>
									)}
								</ButtonContainer>
							</SectionContainer>
							<SectionContainer>
								{!isUserOwner && <UserPreview id={item.userId} />}
								<Description>{item.description}</Description>
							</SectionContainer>
						</InfoContainer>
					</ItemContainer>
				</PageContainer>
				<GrayContainer padded>
					<Header3 uppercase>Podobne przedmioty</Header3>
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
					<Header3 uppercase>Inne przedmioty sprzedającego</Header3>
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
