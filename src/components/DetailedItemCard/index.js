import React from "react"
import moment from "moment"
import { withRouter, Link } from "react-router-dom"
import { compose } from "recompose"

import { withFirebase } from "../Firebase"
import { ItemCard } from "../ItemCard"
import UserPreview from "../UserPreview"
import Button, { ButtonContainer, LoaderButton } from "../Button"
import { ROUTES } from "../../constants"
import { DetailsContainer, Section, InfoItem, OuterContainer } from "./StyledComponents"

class DetailedItemCard extends React.Component {
	state = { isDeleting: false }

	deleteItem = async () => {
		// TODO: better confirmation dialog
		let confirmation = window.confirm("Czy napewno chcesz usunąć ten przedmiot?")

		if (confirmation) {
			this.setState({ isDeleting: true })
			try {
				const firebase = this.props.firebase
				const itemId = this.props.item.itemId

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
				console.log(e)
				alert("Usuwanie nie powiodło się")
			} finally {
				this.setState({ isDeleting: false })
			}
		}
	}

	render() {
		const { item, isUserOwner, history } = this.props

		return (
			<OuterContainer>
				<ItemCard item={item} />
				<DetailsContainer>
					<Section>
						<InfoItem>
							<h4>Wyświetlenia</h4>
							<strong>{item.viewedCount || 0}</strong>
						</InfoItem>
					</Section>
					<Section>
						<InfoItem>
							<h4>Cena</h4>
							{item.originalPrice && item.price !== item.originalPrice && (
								<strike>{item.originalPrice}</strike>
							)}
							<strong>{item.price}</strong>
						</InfoItem>
						<InfoItem>
							<h4>Dodano</h4>
							<strong>{moment(item.createdAt).format("D.MM.YYYY")}</strong>
						</InfoItem>
						<InfoItem>
							<h4>Edytowano</h4>
							<strong>{moment(item.editedAt).format("D.MM.YYYY")}</strong>
						</InfoItem>
					</Section>
					<Section>
						{isUserOwner ? (
							<div>
								<ButtonContainer>
									<Button
										fullWidth
										onClick={() => {
											/* This is not an a-tag to allow for programmatic disabling */
											history.push(ROUTES.EDIT_ITEM.replace(":id", item.itemId))
										}}
									>
										Edytuj
									</Button>
									<LoaderButton
										isLoading={this.state.isDeleting}
										text="Usuń"
										loadingText="Usuwanie..."
										onClick={this.deleteItem}
										fullWidth
									/>
								</ButtonContainer>
								<ButtonContainer>
									<Button accent fullWidth>
										Promuj (Bump)
									</Button>
								</ButtonContainer>
							</div>
						) : (
							<UserPreview id={item.userId} pictureSize="52px" />
						)}
					</Section>
				</DetailsContainer>
			</OuterContainer>
		)
	}
}

export default compose(
	withFirebase,
	withRouter
)(DetailedItemCard)
