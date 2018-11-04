import React, { Component } from "react"
import API from "@aws-amplify/api"
import { Form, Field } from "react-final-form"
import { s3Get, s3Upload, s3Remove } from "./libs/s3lib"

import Button from "./components/Button"
import FileHandler from "./FileHandler"
import File from "./File"
import LoadingSpinner from "./components/LoadingSpinner"
import EmptyState from "./components/EmptyState"
import CenteredLayout from "./CenteredLayout"

class EditItem extends Component {
	state = {
		item: {},
		fileItems: []
	}

	cancel = () => {
		this.props.history.push("/")
	}

	getItem = async () => {
		let itemId = this.props.match.params.id
		let item = await API.get("items", `/items/${itemId}`)
		this.setState({ item })
	}

	getFilesFromS3 = async (fileKeys) => {
		let userId = this.state.item.userId

		for (let fileKey of fileKeys) {
			// Get the url based on s3 key
			let previewUrl = await s3Get(fileKey, userId)
			this.setState({
				fileItems: [
					...this.state.fileItems,
					new FileItem({ fileKey, previewUrl })
				]
			})
		}
	}

	getLocalPreview = (file) => {
		return window.URL.createObjectURL(file)
	}

	componentDidMount = async () => {
		// Get item from dynamoDb
		await this.getItem()
		// Get items attachments' keys and urls for previews
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
		let { userId } = this.state.item.userId
		for (let fileKey of keysToDelete) {
			await s3Remove(fileKey, userId)
		}

		// Merge form data with new attachments to create the request body
		let body = { ...data, attachments: newKeys }

		// Upload data to dynamodDb
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
		let initialValues = this.state.item || {}

		return (
			<CenteredLayout>
				<h1>Edytuj</h1>
				{this.state.item ? (
					<Form
						onSubmit={this.onSubmit}
						initialValues={initialValues}
						render={({ handleSubmit, submitting, values }) => {
							return (
								<form onSubmit={handleSubmit}>
									<div>
										<label>Nazwa </label>
										<Field name="name" component="input" type="text" />
									</div>
									<div>
										{/* TODO: add a better way to select multiple */}
										<label>Projektanci </label>
										<Field
											name="designers"
											component="select"
											type="select"
											multiple
										>
											<option value="Adidas">Adidas</option>
											<option value="Givenchy">Givenchy</option>
											<option value="Gucci">Gucci</option>
											<option value="Nike">Nike</option>
											<option value="Off-White">Off-White</option>
											<option value="Supreme">Supreme</option>
										</Field>
									</div>
									<div>
										<label>Cena </label>
										<Field
											name="price"
											component="input"
											type="number"
											min="0"
											step="1"
											max="99999"
										/>
									</div>
									<div>
										<label>Kategoria </label>
										<Field name="category" component="select" type="select">
											<option />
											<option value="Tee">Tee</option>
											<option value="Buty">Buty</option>
											<option value="Longsleeve">Longsleeve</option>
											<option value="Spodnie">Spodnie</option>
										</Field>
									</div>
									<div>
										<label>Rozmiar </label>
										<Field name="size" component="input" type="text" />
									</div>
									<div>
										<label>Opis </label>
										<Field name="description" component="textarea" />
									</div>
									<div>
										<label>Zdjęcia </label>
										<FileHandler onChange={this.onFileChange} />
										<ul>
											{this.state.fileItems.map((fileItem, i) => (
												<File
													key={i}
													onDelete={this.deleteFileItem}
													fileItem={fileItem}
												/>
											))}
										</ul>
									</div>
									<div className="buttons">
										<Button type="submit" disabled={submitting}>
											Gotowe
										</Button>
										<Button
											type="button"
											disabled={submitting}
											onClick={this.cancel}
										>
											Anuluj
										</Button>
									</div>
								</form>
							)
						}}
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

class FileItem {
	static nextId = 0
	constructor(params) {
		this.id = FileItem.nextId++
		this.fileKey = params.fileKey || ""
		this.previewUrl = params.previewUrl || ""
		this.data = params.data || {}
	}
}

export default EditItem
