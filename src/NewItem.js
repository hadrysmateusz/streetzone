import React, { Component } from "react"
import API from "@aws-amplify/api"
import ItemForm from "./ItemForm"
import CenteredLayout from "./CenteredLayout"
import { s3Upload } from "./libs/s3lib"
// import { MAX_ATTACHMENT_SIZE } from "./const"

class NewItem extends Component {
	state = {
		isLoading: false,
		files: []
	}

	onFileChange = async (files) => {
		files = [...files]
		this.setState({ files })
	}

	onSubmit = async (data, actions) => {
		this.setState({ isLoading: true })

		// TODO: avoid uploading the same files again
		// upload files to s3 and get their id's
		let attachments = []
		for (let file of this.state.files) {
			let attachment = await s3Upload(file)
			attachment && attachments.push(attachment)
		}

		let body = { ...data, attachments }

		// upload data to dynamodDb
		try {
			await API.post("items", "/items", { body })
			this.props.history.push("/")
			return
		} catch (e) {
			alert("Wystąpił problem podczas wystawiania przedmiotu")
		}

		this.setState({ isLoading: false })
	}

	render() {
		return (
			<CenteredLayout>
				<h1>Nowy</h1>
				<ItemForm
					onSubmit={this.onSubmit}
					onFileChange={this.onFileChange}
					validate={this.validate}
					files={this.state.files}
				/>
			</CenteredLayout>
		)
	}
}

export default NewItem
