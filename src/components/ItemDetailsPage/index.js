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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
	Name,
	Designers,
	Sold,
	ButtonGrid,
	InfoItem,
	MainInfo
} from "./StyledComponents"
import Separator from "../Separator"

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
									<MainInfo>
										<div>
											{item.status === ITEM_SCHEMA.status.sold && <Sold>SPRZEDANE</Sold>}
											<Designers>
												{item.designers && (
													<Designers>{item.designers.join(" & ") + " "}</Designers>
												)}
											</Designers>
											<Name>{item.name}</Name>
										</div>
										<div>
											<FontAwesomeIcon icon={["far", "heart"]} />
										</div>
									</MainInfo>

									<InfoItem>
										Dodano: <span>{moment(item.createdAt).format("D.M.YY o HH:mm")}</span>
									</InfoItem>
									<InfoItem>
										Cena: <span>{item.price}zł</span>
									</InfoItem>
									{conditionObj && (
										<InfoItem title={conditionObj.tooltip}>
											Stan: <span>{conditionObj.displayValue}</span>
										</InfoItem>
									)}
								</div>
								<ButtonsContainer>
									{userIsOwner ? (
										<ButtonGrid>
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
										</ButtonGrid>
									) : (
										<AccentButton primary fullWidth>
											Kup
										</AccentButton>
									)}
								</ButtonsContainer>

								{!userIsOwner && (
									<UserInfoContainer>
										<Separator spacing="0px">Informacje o sprzedawcy</Separator>
										<UserPreview id={item.userId} />
									</UserInfoContainer>
								)}
								<Separator spacing="0px">Opis</Separator>
								<Description>{item.description}</Description>
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
							<h3>Inne przedmioty sprzedającego</h3>
							<InstantSearch
								appId={process.env.REACT_APP_APP_ID}
								apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
								indexName="dev_items"
							>
								<Configure hitsPerPage={4} />
								<VirtualMenu attribute="userId" defaultRefinement={item.userId} />
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
