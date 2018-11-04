import React, { Component } from "react"
import API from "@aws-amplify/api"
import ItemForm from "./ItemForm"
import LoadingSpinner from "./components/LoadingSpinner"
import EmptyState from "./components/EmptyState"
import CenteredLayout from "./CenteredLayout"
// import { MAX_ATTACHMENT_SIZE } from "./const"
import { s3Get, s3Upload } from "./libs/s3lib"

class EditItem extends Component {
	state = {
		isLoading: true,
		item: {},
		files: [],
		attachmentURLs: []
	}

	loadImages = async (attachments) => {
		let userId = this.state.item.userId
		let attachmentURLs = await Promise.all(
			attachments.map((attachment) => s3Get(attachment, userId))
		)
		this.setState({ attachmentURLs })
	}

	componentDidMount = async () => {
		try {
			let itemId = this.props.match.params.id
			let item = await API.get("items", `/items/${itemId}`)
			this.setState({ item })
			// TODO: the below only gets the url of the image not the file object
			// this.setState({ attachmentURLs })
		} catch (e) {
			console.log("Failed to find item")
		}
		this.setState({ isLoading: false })
	}

	onFileChange = async (files) => {
		files = [...files]
		this.setState({ files })
	}

	onSubmit = async (data, actions) => {
		this.setState({ isLoading: true })

		// upload files to s3 and get their id's
		let attachments = []
		for (let file of this.state.files) {
			let attachment = await s3Upload(file)
			attachment && attachments.push(attachment)
		}

		let body = { ...data, attachments }

		// upload data to dynamodDb
		try {
			let itemId = this.props.match.params.id
			await API.put("items", `/items/${itemId}`, { body })
			this.props.history.push("/")
			return
		} catch (e) {
			alert("Wystąpił problem podczas edytowania przedmiotu")
		}

		this.setState({ isLoading: false })
	}

	render() {
		return (
			<CenteredLayout>
				<h1>Edytuj</h1>
				{this.state.item ? (
					<>
						<ItemForm
							onSubmit={this.onSubmit}
							onFileChange={this.onFileChange}
							initialValues={this.state.item}
							files={this.state.files}
						/>
					</>
				) : this.state.isLoading ? (
					<LoadingSpinner />
				) : (
					<EmptyState text="Nie znaleziono przedmiotu" />
				)}
			</CenteredLayout>
		)
	}
}

export default EditItem
