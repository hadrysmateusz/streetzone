import { Form, Field } from "react-final-form"
import React, { Component } from "react"
import Button from "./components/Button"
import FileHandler from "./FileHandler"
import { s3Get, s3Upload, s3Remove } from "./libs/s3lib"
import API from "@aws-amplify/api"
import File from "./File"

class FileItem {
	static nextId = 0
	constructor(params) {
		this.id = FileItem.nextId++
		this.fileKey = params.fileKey || ""
		this.previewUrl = params.previewUrl || ""
		this.data = params.data || {}
	}
}

class ItemForm extends Component {
	state = {
		item: {},
		fileItems: []
	}

	getItem = async () => {
		let itemId = this.props.match.params.id
		let item = await API.get("items", `/items/${itemId}`)
		this.setState({ item })
	}

	getFilesFromS3 = async (fileKeys) => {
		let userId = this.state.item.userId

		for (let fileKey of fileKeys) {
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
		await this.getFilesFromS3(this.state.item.attachments)
		console.log(this.state)
	}

	onFileChange = async (newFiles) => {
		newFiles = [...newFiles]

		for (let newFile of newFiles) {
			let previewUrl = window.URL.createObjectURL(newFile)
			await this.setState({
				fileItems: [
					...this.state.fileItems,
					new FileItem({ previewUrl, data: newFile })
				]
			})
			console.log(this.state)
		}
	}

	deleteFileItem = async (id) => {
		await this.setState({
			fileItems: this.state.fileItems.filter((fileItem) => fileItem.id !== id)
		})
		console.log(this.state)
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
		return (
			<Form
				onSubmit={this.onSubmit}
				render={({ handleSubmit, submitting, values }) => {
					return (
						<form onSubmit={handleSubmit}>
							<div>
								<label>Nazwa </label>
								<Field name="name" component="input" type="text" />
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
							<div>
								<pre>{JSON.stringify(values, 0, 2)}</pre>
							</div>
							<div className="buttons">
								<Button type="submit" disabled={submitting}>
									Gotowe
								</Button>
							</div>
						</form>
					)
				}}
			/>
		)
	}
}

export default ItemForm
