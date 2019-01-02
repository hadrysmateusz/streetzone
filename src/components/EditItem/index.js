import React, { Component } from "react"
import { compose } from "recompose"

import { withFirebase } from "../Firebase"
import { withAuthorization, withAuthentication } from "../UserSession"
import LoadingSpinner from "../LoadingSpinner"
import EmptyState from "../EmptyState"
import EditItemForm from "./EditItemForm"
import { CustomFile } from "../FileHandler"
import { Header } from "../Basics"
import { PageContainer } from "../Base"
import { NotFoundError } from "../../errors"

class EditItemPage extends Component {
	state = {
		error: null,
		isLoading: true,
		initialData: null
	}

	componentDidMount = async () => {
		try {
			// Get item from database
			let item = await this.props.firebase.getItemData(this.props.match.params.id)

			// Get item attachments' refs and urls for previews
			const imageURLs = await this.props.firebase.batchGetImageURLs(item.attachments)
			const files = item.attachments.map((attachment, i) => {
				return new CustomFile({ ref: attachment, previewUrl: imageURLs[i] })
			})

			// Format data for the form
			const initialData = {
				price: Number.parseInt(item.price),
				description: item.description || "",
				files: files,
				modifiedAt: Date.now()
			}

			this.setState({ initialData })
		} catch (error) {
			if (error instanceof NotFoundError) {
				this.setState({ error })
			} else {
				throw error
			}
		} finally {
			this.setState({ isLoading: false })
		}
	}

	onSubmit = async (values) => {
		try {
			const { firebase, history, match } = this.props
			const files = values.files

			// Upload NEW files and get ALL refs
			const newRefs = await Promise.all(
				files.map(async (file) => {
					// If file already has a ref, return it
					if (file.ref) return file.ref

					// Upload the new files and return promise containing ref
					const snapshot = await firebase.uploadFile("attachments", file.data)
					return snapshot.ref.fullPath
				})
			)

			// Format the data
			const data = {
				modifiedAt: Date.now(),
				price: Number.parseInt(values.price),
				description: values.description || "",
				attachments: newRefs
			}

			// TODO: add a check against an external schema to make sure all values are present

			// Update item
			await firebase.item(match.params.id).update(data)

			// Get just the old refs
			let oldRefs = this.state.initialData.files.map((file) => file.ref)

			// Old refs no longer present in new refs are marked for deletion
			let refsToDelete = oldRefs.filter((oldRef) => !newRefs.includes(oldRef))

			// Remove files associated with the marked refs
			await firebase.batchRemoveFiles(refsToDelete)

			// Redirect to home page
			history.push("/")
			return
		} catch (error) {
			alert("Wystąpił problem podczas edytowania przedmiotu")
			console.log(error)
		}
	}

	render() {
		const { isLoading, error, initialData } = this.state
		return (
			<PageContainer maxWidth={1}>
				<Header>Edytuj</Header>
				{error ? (
					<EmptyState text={error.message} />
				) : isLoading ? (
					<LoadingSpinner />
				) : (
					<EditItemForm
						initialValues={initialData}
						isLoading={isLoading}
						onSubmit={this.onSubmit}
					/>
				)}
			</PageContainer>
		)
	}
}

const condition = (authUser) => !!authUser

export default compose(
	withFirebase,
	withAuthentication,
	withAuthorization(condition)
)(EditItemPage)
