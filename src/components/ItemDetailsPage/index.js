import React, { Component } from "react"
import { Link } from "react-router-dom"
import { compose } from "recompose"
import moment from "moment"
import styled from "styled-components"

import ImageGallery from "../ImageGallery"
import { withFirebase } from "../Firebase"
import { withAuthentication } from "../UserSession"
import LoadingSpinner from "../LoadingSpinner"
import Button, { LoaderButton, AccentButton } from "../Button"
import EmptyState from "../EmptyState"
import UserPreview from "../UserPreview"
import { CSS, ITEM_SCHEMA } from "../../constants"
import { translateCondition } from "../../constants/item_schema"

const MainContainer = styled.main`
	display: flex;
	flex-direction: column;
	max-width: ${(p) => p.theme.breakpoints[4]}px;
	margin: 0 auto;
	height: 100%;
	padding: 0 20px;
`

const ItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 100%;
	height: 100%;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		flex-direction: row;
	}
`

const InfoContainer = styled.div`
	flex: 0 0 100%;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		padding-left: 20px;
		padding-top: 10px;
		max-width: 330px;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		max-width: 380px;
		padding-left: 30px;
		padding-top: 15px;
	}
`

const UserInfoContainer = styled.div`
	margin-top: 10px;
`

const Description = styled.div`
	margin-top: 10px;
	color: #3d3d3d;
`

const ButtonsContainer = styled.div`
	margin-top: 10px;
	display: flex;
	align-content: flex-start;
`

const MainInfo = styled.div`
	margin: 0 0 15px;
	font-size: 1.5rem;
`

const Designers = styled.h3`
	display: inline;
	font-size: 1.8rem;
	font-weight: bold;
`

const Sold = styled.div`
	font-size: 2.1rem;
	color: ${CSS.COLOR_DANGER};
	margin-bottom: 12px;
	font-weight: 500;
`

class ItemDetailsPage extends Component {
	state = {
		isLoading: true,
		item: null,
		isDeleting: false
	}

	componentDidMount = async () => {
		// Get item from database
		const item = await this.props.firebase.getItemData(this.props.match.params.id)

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

		return item && !isLoading ? (
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
							<div title={conditionObj.tooltip}>
								Stan: <strong>{conditionObj.displayValue}</strong>
							</div>
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
				<div className="recommendedContainer" />
			</MainContainer>
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
