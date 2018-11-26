import React, { Component } from "react"
import API from "@aws-amplify/api"
import { s3Get, s3Upload, s3Remove } from "./libs/s3lib"
import errorLog from "./libs/errorLog"

import FileItem from "./classes/FileItem"
import LoadingSpinner from "./components/LoadingSpinner"
import EmptyState from "./components/EmptyState"
import CenteredLayout from "./CenteredLayout"
import ItemForm from "./ItemForm"

class EditItem extends Component {
	state = {
		item: {},
		fileItems: []
	}

	cancel = () => {
		this.props.history.push("/")
	}

	getItem = async () => {
		try {
			const { partitionKey, sortKey } = this.props.match.params
			const compositeKey = partitionKey + "." + sortKey
			const item = await API.get("items", `/items/${compositeKey}`)

			await this.setState({ item, isLoading: false })
		} catch (e) {
			errorLog(e, "Error while loading item")
			await this.setState({ isLoading: false })
		}
	}

	getFilesFromS3 = async (fileKeys) => {
		let identityId = this.state.item.identityId

		for (let fileKey of fileKeys) {
			// Get the url based on s3 key
			let previewUrl = await s3Get(fileKey, identityId)
			this.setState({
				fileItems: [
					...this.state.fileItems,
					new FileItem({ fileKey, previewUrl })
				]
			})
		}
	}

	componentDidMount = async () => {
		// Get item from dynamoDb
		await this.getItem()
		// Get item attachments' keys and urls for previews
		await this.getFilesFromS3(this.state.item.attachments)
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

	deleteFileItem = async (id) => {
		await this.setState({
			fileItems: this.state.fileItems.filter((fileItem) => fileItem.id !== id)
		})
	}

	onSubmit = async (data) => {
		let fileItems = this.state.fileItems

		// Upload only the new files to s3 and get their keys
		for (let fileItem of fileItems) {
			// File is considered to be new if its key is unset (empty string)
			if (!fileItem.fileKey) {
				fileItem.fileKey = await s3Upload(fileItem.data)
			}
		}

		// All of the new keys
		let newKeys = fileItems.map((fileItem) => fileItem.fileKey)

		// Just the old keys
		let oldKeys = this.state.item.attachments

		// Old keys no longer present in new keys are marked for deletion from s3
		let keysToDelete = oldKeys.filter((oldKey) => !newKeys.includes(oldKey))

		// Remove files associated with the marked keys
		let { identityId } = this.state.item.identityId
		for (let fileKey of keysToDelete) {
			await s3Remove(fileKey, identityId)
		}

		// Merge form data with new attachments to create the request body
		let body = { ...data, attachments: newKeys }

		// Upload data to dynamodDb
		try {
			let sortKey = this.state.item.createdAt
			console.log(`/items/${sortKey}`)
			await API.put("items", `/items/${sortKey}`, { body })
			this.props.history.push("/")
			return
		} catch (e) {
			alert("Wystąpił problem podczas edytowania przedmiotu")
		}
		this.setState({ isLoading: false })
	}

	render() {
		let initialValues = this.state.item || {}

		return (
			<CenteredLayout>
				<h1>Edytuj</h1>
				{this.state.item ? (
					<ItemForm
						initialValues={initialValues}
						fileItems={this.state.fileItems}
						onSubmit={this.onSubmit}
						deleteFileItem={this.deleteFileItem}
						onFileChange={this.onFileChange}
						cancel={this.cancel}
					/>
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
