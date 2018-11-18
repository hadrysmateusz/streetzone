import React, { Component } from "react"
import API from "@aws-amplify/api"
import { Link } from "react-router-dom"

import styles from "./ItemDetails.module.scss"
import { ITEM_DELETE_CONFIRM_MESSAGE } from "./const.js"

import LoaderButton from "./components/LoaderButton"
import LoadingSpinner from "./components/LoadingSpinner"
import EmptyState from "./components/EmptyState"
import Button from "./components/Button"
import CenteredLayout from "./CenteredLayout"
import UserPreview from "./UserPreview"

import { s3Get } from "./libs/s3lib"
import errorLog from "./libs/errorLog"

class ItemDetails extends Component {
	state = {
		isLoading: true,
		item: null,
		userIsOwner: false,
		isDeleting: false,
		attachmentURLs: [],
		currentImageIndex: 0
	}

	loadImages = async () => {
		const { identityId, attachments } = this.state.item
		let attachmentURLs = await Promise.all(
			attachments.map((attachment) => s3Get(attachment, identityId))
		)
		await this.setState({ attachmentURLs })
	}

	componentDidMount = async () => {
		try {
			let itemId = this.props.match.params.id
			let item = await API.get("items", `/items/${itemId}`)
			await this.setState({ item })
			await this.loadImages()
		} catch (e) {
			errorLog(e, "Error while loading item")
		}

		console.log(this.state.item)

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
				return
			} catch (e) {
				alert("Usuwanie nie powiodło się")
			}
		}
		this.setState({ isDeleting: false })
	}

	changeCurrentImage = (e) => {
		let currentImageIndex = e.currentTarget.dataset.index
		this.setState({ currentImageIndex })
	}

	render() {
		const { item, isLoading, isDeleting, attachmentURLs } = this.state
		const { currentUser } = this.props

		const userIsOwner =
			item && currentUser ? currentUser.username === item.userId : false

		return (
			<CenteredLayout>
				{item ? (
					<div className={styles.mainContainer}>
						<div className={styles.itemContainer}>
							<div className={styles.photosContainer}>
								{/* TODO: Make image gallery into separate component */}
								<div className={styles.currentImage}>
									<img
										src={attachmentURLs[this.state.currentImageIndex]}
										alt=""
									/>
								</div>
								<div className={styles.thumbnailsContainer}>
									{attachmentURLs.map((url, i) => (
										<div
											key={i}
											data-index={i}
											className={styles.thumbnailContainer}
											onClick={this.changeCurrentImage}
										>
											<img src={url} className={styles.thumbnail} alt="" />
										</div>
									))}
								</div>
							</div>
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
									<div>Dodano: {new Date(item.createdAt).toLocaleString()}</div>
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
								<pre className={styles.description}>{item.description}</pre>
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
					<EmptyState text="Nie znaleziono przedmiotu" />
				)}
			</CenteredLayout>
		)
	}
}

export default ItemDetails
