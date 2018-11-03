import React, { Component } from "react"
import API from "@aws-amplify/api"
import Auth from "@aws-amplify/auth"
import Storage from "@aws-amplify/storage"
import { Link } from "react-router-dom"

import styles from "./ItemDetails.module.scss"
import { ITEM_DELETE_CONFIRM_MESSAGE } from "./const.js"

import LoaderButton from "./components/LoaderButton"
import LoadingSpinner from "./components/LoadingSpinner"
import EmptyState from "./components/EmptyState"
import Button from "./components/Button"
import CenteredLayout from "./CenteredLayout"

class ItemDetails extends Component {
	state = {
		isLoading: true,
		item: null,
		userIsOwner: false,
		isDeleting: false,
		attachmentURLs: []
	}

	loadImages = async (attachments) => {
		// TODO: lazy-loading
		let attachmentURLs = await Promise.all(
			attachments.map((attachment) =>
				Storage.get(attachment, {
					identityId: this.state.item.userId
				})
			)
		)
		this.setState({ attachmentURLs })
	}

	componentDidMount = async () => {
		let item

		try {
			let itemId = this.props.match.params.id
			item = await API.get("items", `/items/${itemId}`)
			await this.setState({ item })
			this.loadImages(item.attachments)
		} catch (e) {
			console.log("Error while loading item")
		}

		// TODO: improve speed of this
		// check if current user is the owner
		try {
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
		const {
			item,
			userIsOwner,
			isLoading,
			isDeleting,
			attachmentURLs
		} = this.state

		return (
			<CenteredLayout>
				{item ? (
					<div className={styles.mainContainer}>
						<div className={styles.itemContainer}>
							<div className={styles.photosContainer}>
								<div className={styles.thumbnailsContainer}>
									{attachmentURLs.map((url, i) => (
										<div key={i} className={styles.thumbnailContainer}>
											<img src={url} className={styles.thumbnail} alt="" />
										</div>
									))}
								</div>
								{/* TODO: Make image gallery into separate component */}
								{/* <div className={styles.currentImage}>
									<img src="https://picsum.photos/400/500/?random" alt="" />
								</div> */}
							</div>
							<div className={styles.infoContainer}>
								<div className={styles.basicInfo}>
									<h2>
										{item.designers && item.designers.join(" & ") + ": "}
										{item.name}
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
			</CenteredLayout>
		)
	}
}

export default ItemDetails
