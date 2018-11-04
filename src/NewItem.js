import React, { Component } from "react"
import API from "@aws-amplify/api"
import { s3Upload } from "./libs/s3lib"

import FileItem from "./classes/FileItem"

import ItemForm from "./ItemForm"
import CenteredLayout from "./CenteredLayout"

class NewItem extends Component {
	state = {
		isLoading: false,
		files: [],
		fileItems: []
	}

	onFileChange = async (newFiles) => {
		// Convert FileList into an array
		newFiles = [...newFiles]

		// Create a new FileItem for every newly selected file
		// along with a generated ObjectURL for preview
		for (let newFile of newFiles) {
			let previewUrl = window.URL.createObjectURL(newFile)
			await this.setState({
				fileItems: [
					...this.state.fileItems,
					new FileItem({ previewUrl, data: newFile })
				]
			})
		}
	}

	cancel = () => {
		this.props.history.push("/")
	}

	onSubmit = async (data, actions) => {
		this.setState({ isLoading: true })

		let fileItems = this.state.fileItems

		// Upload files to s3 and get their keys
		for (let fileItem of fileItems) {
			fileItem.fileKey = await s3Upload(fileItem.data)
		}

		// All of the new keys
		let newKeys = fileItems.map((fileItem) => fileItem.fileKey)

		// Merge form data with new attachments to create the request body
		let body = { ...data, attachments: newKeys }

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

	deleteFileItem = async (id) => {
		await this.setState({
			fileItems: this.state.fileItems.filter((fileItem) => fileItem.id !== id)
		})
	}

	render() {
		return (
			<CenteredLayout>
				<h1>Nowy</h1>
				<ItemForm
					fileItems={this.state.fileItems}
					onSubmit={this.onSubmit}
					deleteFileItem={this.deleteFileItem}
					onFileChange={this.onFileChange}
					cancel={this.cancel}
				/>
			</CenteredLayout>
		)
	}
}

export default NewItem
