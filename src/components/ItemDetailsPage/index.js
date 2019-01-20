import React, { Component } from "react"
import { Link } from "react-router-dom"
import { compose } from "recompose"
import moment from "moment"
import {
	InstantSearch,
	Configure,
	connectRefinementList,
	connectMenu
} from "react-instantsearch-dom"

import ImageGallery from "../ImageGallery"
import { withFirebase } from "../Firebase"
import { withAuthentication } from "../UserSession"
import LoadingSpinner from "../LoadingSpinner"
import Button, { LoaderButton, AccentButton } from "../Button"
import EmptyState from "../EmptyState"
import UserPreview from "../UserPreview"
import { ITEM_SCHEMA } from "../../constants"
import { translateCondition } from "../../constants/item_schema"
import { PageContainer } from "../Containers"
import { AlgoliaHits } from "../Algolia/AlgoliaInfiniteHits"
import {
	MainContainer,
	ItemContainer,
	InfoContainer,
	UserInfoContainer,
	Description,
	ButtonsContainer,
	MainInfo,
	Designers,
	Sold
} from "./StyledComponents"

const VirtualRefinementList = connectRefinementList(() => null)
const VirtualMenu = connectMenu(() => null)

class ItemDetailsPage extends Component {
	state = {
		isLoading: true,
		item: null,
		isDeleting: false
	}

	componentDidUpdate = async (prevProps, prevState) => {
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
		let userIsOwner

		if (item && authUser) {
			const ownerId = item.userId
			const authUserId = this.props.authUser.uid
			userIsOwner = authUserId && ownerId === authUserId
		}

		let conditionObj
		if (item && !isLoading) {
			conditionObj = translateCondition(item.condition)
		}

		console.log(item)

		return (
			<PageContainer maxWidth={5}>
				{item && !isLoading ? (
					<MainContainer>
						<ItemContainer>
							<ImageGallery item={item} />
							<InfoContainer>
								<div>
									{item.status === ITEM_SCHEMA.status.sold && <Sold>SPRZEDANE</Sold>}
									<MainInfo>
										{item.designers && (
											<Designers>{item.designers.join(" & ") + " "}</Designers>
										)}
										{item.name}
									</MainInfo>
									<div>Dodano: {moment(item.createdAt).format("D.M.YY o HH:mm")}</div>
									<br />
									<div>
										Cena: <strong>{item.price}</strong>
									</div>
									{conditionObj && (
										<div title={conditionObj.tooltip}>
											Stan: <strong>{conditionObj.displayValue}</strong>
										</div>
									)}
								</div>
								<ButtonsContainer>
									{userIsOwner ? (
										<>
											<Button as={Link} to={`/e/${item.itemId}`}>
												Edytuj
											</Button>
											<LoaderButton
												isLoading={isDeleting}
												text="Usuń"
												loadingText="Usuwanie..."
												onClick={this.deleteItem}
											/>
										</>
									) : (
										<AccentButton primary>Kup</AccentButton>
									)}
								</ButtonsContainer>
								<Description>{item.description}</Description>
								{!userIsOwner && (
									<UserInfoContainer>
										<strong>Sprzedawca:</strong>
										<UserPreview id={item.userId} />
									</UserInfoContainer>
								)}
							</InfoContainer>
						</ItemContainer>
						<div className="recommendedContainer">
							<h3>Podobne przedmioty</h3>
							<InstantSearch
								appId={process.env.REACT_APP_APP_ID}
								apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
								indexName="dev_items"
							>
								<Configure hitsPerPage={4} />
								<VirtualRefinementList
									attribute="designers"
									defaultRefinement={item.designers}
								/>
								<VirtualMenu attribute="category" defaultRefinement={item.category} />
								<AlgoliaHits />
							</InstantSearch>
						</div>
					</MainContainer>
				) : isLoading ? (
					<LoadingSpinner />
				) : (
					<EmptyState text="Nie znaleziono przedmiotu, być może został usunięty." />
				)}
			</PageContainer>
		)
	}
}

export default compose(
	withAuthentication,
	withFirebase
)(ItemDetailsPage)
