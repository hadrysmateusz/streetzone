import React, { Component } from "react"
import { Link } from "react-router-dom"
import { compose } from "recompose"
import moment from "moment"

import ImageGallery from "../ImageGallery"
import { withFirebase } from "../Firebase"
import { withAuthentication } from "../UserSession"
import LoadingSpinner from "../LoadingSpinner"
import LoaderButton from "../LoaderButton"
import EmptyState from "../EmptyState"
import CenteredLayout from "../CenteredLayout"
import Button from "../Button"
import UserPreview from "../UserPreview"

import styles from "./ItemDetails.module.scss"

class ItemDetailsPage extends Component {
	state = {
		isLoading: true,
		item: null,
		isDeleting: false
	}

	componentDidMount = async () => {
		// Get item from database
		const item = await this.props.firebase.getItem(this.props.match.params.id)

		this.setState({ item, isLoading: false })
	}

	deleteItem = async () => {
		// TODO: better confirmation dialog
		let confirmation = window.confirm(
			"Czy napewno chcesz usunąć ten przedmiot?"
		)

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

		return (
			<CenteredLayout>
				{item && !isLoading ? (
					<div className={styles.mainContainer}>
						<div className={styles.itemContainer}>
							<ImageGallery item={item} />
							<div className={styles.infoContainer}>
								<div className={styles.basicInfo}>
									<h2 className={styles.mainInfo}>
										{item.designers && item.designers.join(" & ") + ": "}
										{item.name}
									</h2>
									<div>
										Cena: {item.price}
										zł
									</div>
									<div>
										Dodano: {moment(item.createdAt).format("D.M.YY o HH:mm")}
									</div>
								</div>
								<div className={styles.buttons}>
									{userIsOwner ? (
										<>
											<Link to={`/e/${item.itemId}`}>
												<Button>Edytuj</Button>
											</Link>
											<LoaderButton
												isLoading={isDeleting}
												text="Usuń"
												loadingText="Usuwanie..."
												onClick={this.deleteItem}
											/>
										</>
									) : (
										<Button primary>Kup</Button>
									)}
								</div>
								<div className={styles.description}>{item.description}</div>
								{!userIsOwner && (
									<div className={styles.user}>
										<strong>Sprzedawca:</strong>
										<UserPreview id={item.userId} />
									</div>
								)}
							</div>
						</div>
						<div className="recommendedContainer" />
					</div>
				) : isLoading ? (
					<LoadingSpinner />
				) : (
					<EmptyState text="Nie znaleziono przedmiotu, być może został usunięty." />
				)}
			</CenteredLayout>
		)
	}
}

export default compose(
	withAuthentication,
	withFirebase
)(ItemDetailsPage)
