import React from "react"
import styled from "styled-components"
import ContainerDimensions from "react-container-dimensions"
import moment from "moment"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"

import { withFirebase } from "../Firebase"
import { ItemCard } from "../ItemCard"
import UserPreview from "../UserPreview"
import Button, { ButtonContainer, LoaderButton } from "../Button"
import Link from "react-router-dom/Link"
import { ROUTES } from "../../constants"

const OuterContainer = styled.div`
	display: flex;
	> * {
		flex: 0 0 50%;
		max-width: 50%;
	}
`
const DetailsContainer = styled.div`
	padding: 0 8px;
`
const Section = styled.div`
	margin: 10px 0;
	&:not(:last-child) {
		border-bottom: 1px solid ${(p) => p.theme.colors.gray[75]};
	}
`
const InfoItem = styled.div`
	margin: 10px 5px;
	font-size: 0.94rem;
	display: flex;

	h4 {
		flex: 1;
		margin: 0;
		font-weight: 300;
	}
	strike {
		color: ${(p) => p.theme.colors.gray[50]};
	}
`

const ItemsContainer = styled.div`
	display: grid;
	grid-gap: 3px;
	width: 100%;
	margin: 0 auto;

	grid-auto-rows: min-content;

	@media (max-width: ${(p) => p.theme.breakpoints[3] - 1}px) {
		max-width: 500px;
	}

	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		grid-gap: 10px;
	}

	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		grid-template-columns: repeat(2, 1fr);
	}
`

export const DetailedItemsView = ({ items, userIsOwner }) => {
	return (
		<ContainerDimensions>
			{({ width }) => (
				<ItemsContainer containerWidth={width}>
					{items.map((item) => (
						<DetailedItemCard item={item} key={item.itemId} userIsOwner={userIsOwner} />
					))}
				</ItemsContainer>
			)}
		</ContainerDimensions>
	)
}

const DetailedItemCard = compose(
	withFirebase,
	withRouter
)(
	class detailedItemCard extends React.Component {
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
			const { item, userIsOwner } = this.props

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
							{userIsOwner ? (
								<div>
									<ButtonContainer>
										<Button
											fullWidth
											as={Link}
											to={ROUTES.EDIT_ITEM.replace(":id", item.itemId)}
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
)
