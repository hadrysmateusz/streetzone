import React, { Component } from "react"
import { compose } from "recompose"

import { withAuthentication } from "../UserSession"
import { withFirebase } from "../Firebase"
import LoadingSpinner from "../LoadingSpinner"
import { CustomFile } from "../FileHandler"
import getProfilePictureURL from "../../utils/getProfilePictureURL"

import ProfileEditForm from "./ProfileEditForm"

class ProfileEdit extends Component {
	state = { isLoading: true, error: null, initialValues: null }

	getUserData = () => {
		this.setState({ isLoading: true })

		const user = this.props.authUser

		let initialValues = {
			name: user.name,
			email: user.email,
			city: user.city,
			phone: user.phone,
			info: user.info
		}

		if (user.profilePictureURLs && user.profilePictureURLs.length > 0) {
			const file = new CustomFile({
				storageRef: user.profilePictureRef || null,
				previewUrl: getProfilePictureURL(user, "L"),
				isUploaded: true
			})
			initialValues.file = file
		}

		this.setState({ initialValues, isLoading: false })
	}

	loadImageFile = async () => {
		const { authUser } = this.props

		// TODO: this won't work for social signin photos as they don't have a ref
		if (authUser.profilePictureRef) {
			try {
				const file = new CustomFile({
					storageRef: authUser.profilePictureRef || null,
					previewUrl: getProfilePictureURL(authUser, "L"),
					isUploaded: true
				})

				this.setState({ file })
			} catch (error) {
				console.log(error)
			}
		}
		this.setState({ isLoading: false })
	}

	componentDidMount() {
		this.getUserData()
		this.loadImageFile()
	}

	onSubmit = async (values, actions) => {
		const { firebase, authUser } = this.props
		const userId = authUser.uid
		const initialValues = this.state.initialValues
		const file = values.file

		let newFileRef = null
		let newURL_temp = null

		if (values.email) {
			// TODO: this requires re-authentication
			firebase.updateEmail(values.email)
		}

		if (!file || !file.isUploaded) {
			// If there is no file, create empty ref
			// otherwise upload the new file and use its ref

			if (file) {
				// Upload the new file and return its ref
				console.log("uploading file...")
				const snapshot = await firebase.uploadFile(
					`profile-pictures/${authUser.uid}`,
					file.data
				)
				newFileRef = snapshot.ref.fullPath
				newURL_temp = await firebase.getImageURL(newFileRef)
			}
		}

		// Get ref of current profile picture
		const oldFileRef = authUser.profilePictureRef || null

		const data = {
			name: values.name || initialValues.name || null,
			email: values.email || initialValues.email || null,
			city: values.city || null,
			phone: values.phone || null,
			info: values.info || null,
			profilePictureRef: newFileRef,
			profilePictureURLs: [newURL_temp]
		}

		console.log(data)

		// Update the user with the new list of comments
		await this.props.firebase.user(userId).update({ ...data })

		// Remove old file
		if (oldFileRef) {
			await firebase.file(oldFileRef).delete()
		}

		// Get the new information
		this.getUserData()
		this.loadImageFile()

		// Reset the form
		actions.reset()
	}

	render() {
		return (
			<div>
				{this.state.isLoading ? (
					<LoadingSpinner />
				) : (
					<ProfileEditForm
						onSubmit={this.onSubmit}
						initialValues={this.state.initialValues}
					/>
				)}
			</div>
		)
	}
}

export default compose(
	withFirebase,
	withAuthentication
)(ProfileEdit)
