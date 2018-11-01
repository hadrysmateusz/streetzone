import React, { Component } from "react"
import { API, Auth } from "aws-amplify"
import { Link } from "react-router-dom"
import LoaderButton from "./components/LoaderButton"
import LoadingSpinner from "./components/LoadingSpinner"
import EmptyState from "./components/EmptyState"
import Button from "./components/Button"
import styles from "./ItemDetails.module.scss"
import { ITEM_DELETE_CONFIRM_MESSAGE } from "./const.js"

class ItemDetails extends Component {
	state = {
		item: null,
		userIsOwner: false,
		isLoading: true,
		isDeleting: false
	}

	componentDidMount = async () => {
		try {
			// get the item
			let itemId = this.props.match.params.id
			let item = await API.get("items", `/items/${itemId}`)
			// TODO: handle not found items (the api simply returns an empty object which passes the test and react tries to render the page instead of the empty state)
			this.setState({ item })

			// check if current user is the owner
			let { isAuthenticated } = this.props
			if (isAuthenticated) {
				let info = await Auth.currentUserInfo()
				let userIsOwner = isAuthenticated && info.id === item.userId
				this.setState({ userIsOwner })
			}
		} catch (e) {
			console.log("Authorization error")
		}
		this.setState({ isLoading: false })
	}

	deleteItem = async () => {
		// TODO: better confirmation dialog
		this.setState({ isDeleting: true })
		let confirmation = window.confirm(ITEM_DELETE_CONFIRM_MESSAGE)
		if (confirmation) {
			try {
				let itemId = this.props.match.params.id
				await API.del("items", `/items/${itemId}`)
				this.props.history.push("/")
			} catch (e) {
				alert("Usuwanie nie powiodło się")
			}
		}
		this.setState({ isDeleting: false })
	}

	render() {
		const { item, userIsOwner, isLoading, isDeleting } = this.state

		return (
			<>
				{item ? (
					<div className={styles.mainContainer}>
						<div className={styles.itemContainer}>
							<div className={styles.photosContainer}>
								<div className={styles.currentImage}>
									<img src="https://picsum.photos/400/500/?random" alt="" />
								</div>
							</div>
							<div className={styles.infoContainer}>
								<div className={styles.basicInfo}>
									<h2>
										{item.designers.join(" & ")}: {item.name}
									</h2>
									<div>
										Cena: {item.price}
										zł
									</div>
									<div>Dodano: {new Date(item.createdAt).toLocaleString()}</div>
								</div>
								<div className="buttons">
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
								<div className="user" />
								<div className="description">{item.description}</div>
							</div>
						</div>
						<div className="recommendedContainer" />
					</div>
				) : isLoading ? (
					<LoadingSpinner />
				) : (
					<EmptyState text="Nie znaleziono przedmiotu" />
				)}
			</>
		)
	}
}

export default ItemDetails
