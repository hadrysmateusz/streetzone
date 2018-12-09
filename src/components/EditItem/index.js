import React, { Component } from "react"
import { compose } from "recompose"
import uuidv1 from "uuid/v1"

import { withFirebase } from "../Firebase"
import { withAuthorization } from "../UserSession"
import LoadingSpinner from "../LoadingSpinner"
import EmptyState from "../EmptyState"
import CenteredLayout from "../CenteredLayout"
import { ItemForm } from "../ItemForm"

import { CustomFile } from "../FileHandler"
import { formData, dbData } from "../../utils/formatItemData"
import styles from "./EditItem.module.scss"

class EditItemPage extends Component {
	state = {
		isLoading: true,
		data: null
	}

	componentDidMount = async () => {
		try {
			// Get item from database
			const item = await this.props.firebase.getItem(this.props.match.params.id)

			// Get item attachments' refs and urls for previews
			const imageURLs = await this.props.firebase.getImageURLs(item.attachments)
			const files = item.attachments.map((attachment, i) => {
				return new CustomFile({ ref: attachment, previewUrl: imageURLs[i] })
			})

			// Format data for the form
			const data = formData({ ...item, files })

			this.setState({ data, isLoading: false })
		} catch (error) {
			console.log(error)
			this.setState({ isLoading: false })
		}
	}

	onSubmit = async (values) => {
		try {
			const { firebase, history } = this.props
			const files = values.files || []

			// Get additional data
			const userId = firebase.authUser().uid

			// Fetch current user's items from database
			const currentUserSnapshot = await firebase.user(userId).get()
			const oldItems = currentUserSnapshot.data().items

			// If oldItems wasn't found throw to prevent overwriting data
			if (!oldItems) {
				throw new Error("couldn't find user data")
			}

			// Upload NEW files and get ALL refs
			const attachments = await Promise.all(
				files.map(async (file) => {
					// If file already has a ref, return it
					if (file.ref) return file.ref

					// Upload the new files and return promise containing ref
					const name = uuidv1()
					const ref = firebase.storageRef.child(`attachments/${name}`)
					const snapshot = await ref.put(file.data)
					return snapshot.ref.fullPath
				})
			)

			// Get just the old refs
			let oldRefs = this.state.data.files.map((file) => file.ref)

			// Old refs no longer present in new refs are marked for deletion
			let refsToDelete = oldRefs.filter(
				(oldRef) => !attachments.includes(oldRef)
			)

			// Update modifiedAt
			const time = { modifiedAt: Date.now() }

			// Make sure only the required values are passed
			const data = dbData(values, time, userId, attachments)

			// Check if all data is present
			for (let [key, value] of Object.entries(data)) {
				const err = new Error("missing data: " + key)
				if (!value && key !== "description") {
					throw err
				}
				if (Array.isArray(value) && value.length === 0) {
					throw err
				}
			}

			// Update item
			await firebase.item(this.props.match.params.id).update(data)

			// Remove files associated with the marked refs
			await Promise.all(
				refsToDelete.map((ref) => {
					return firebase.storageRef.child(ref).delete()
				})
			)

			// Redirect to home page
			history.push("/")
			return
		} catch (error) {
			alert("Wystąpił problem podczas wystawiania przedmiotu")
			console.log(error)
		}
	}

	render() {
		return (
			<CenteredLayout>
				<div className={styles.mainContainer}>
					<h1>Edytuj</h1>
					{this.state.isLoading && (
						<h4>
							Ładowanie...&nbsp;
							<LoadingSpinner inline />
						</h4>
					)}
					{(this.state.data || this.state.isLoading) && (
						<ItemForm
							initialValues={this.state.data}
							isLoading={this.state.isLoading}
							onSubmit={this.onSubmit}
						/>
					)}
					{!this.state.data && !this.state.isLoading && (
						<EmptyState text="Nie znaleziono przedmiotu" />
					)}
				</div>
			</CenteredLayout>
		)
	}
}

const condition = (authUser) => !!authUser

export default compose(
	withFirebase,
	withAuthorization(condition)
)(EditItemPage)
