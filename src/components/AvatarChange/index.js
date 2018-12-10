import React from "react"
import { Form, Field } from "react-final-form"
import { compose } from "recompose"
import uuidv1 from "uuid/v1"

import LoaderButton from "../LoaderButton"
// import Button from "../Button"
import { FileHandlerSingle, CustomFile } from "../FileHandler"
import { withRouter } from "react-router-dom"
import { withFirebase } from "../Firebase"

// import styles from "./AvatarChange.module.scss"
// import { ROUTES, FORMS, CONST } from "../../constants"

class AvatarChangeForm extends React.Component {
	state = {
		isLoading: true,
		file: null
	}

	componentDidMount = () => {
		this.loadImage()
	}

	validate = (values) => {
		const errors = {}
		return errors
	}

	loadImage = async () => {
		const currentUser = this.props.firebase.currentUser()
		const currentUserData = (await currentUser.get()).data()

		if (currentUserData.profilePicture) {
			let ref = this.props.firebase.storageRef.child(
				currentUserData.profilePicture
			)

			try {
				const imageURL = await ref.getDownloadURL()

				const file = new CustomFile({ ref: ref, previewUrl: imageURL })

				this.setState({ file, isLoading: false })
			} catch (error) {
				console.log(error)
			}
		}
	}

	onSubmit = async (values) => {
		try {
			const { firebase, history } = this.props
			const file = values.file

			// If file already has a ref there were no changes
			if (file && file.ref) return

			const currentUser = firebase.currentUser()
			const currentUserData = (await currentUser.get()).data()
			let oldFileRef, newFileRef

			// If there is no file, check if user has a picture
			// If so, mark it for deletion, otherwise throw error
			if (!file) {
				if (currentUserData.profilePicture) {
					// Create a new empty ref
					newFileRef = null
				} else {
					throw new Error("No new file was provided")
				}
			} else {
				// Upload the new file and return its ref
				const name = uuidv1()
				const userId = currentUser.id
				const ref = firebase.storageRef.child(
					`profile-pictures/${userId}/${name}`
				)
				const snapshot = await ref.put(file.data)
				newFileRef = snapshot.ref.fullPath
			}

			// Get ref of current profile picture
			if (currentUserData.profilePicture) {
				oldFileRef = currentUserData.profilePicture
			}

			// Update (or clear) profilePicture in database
			await currentUser.update({ profilePicture: newFileRef })

			// Remove old file
			if (oldFileRef) {
				await firebase.storageRef.child(oldFileRef).delete()
			}

			// Redirect to home page
			history.push("/")
			return
		} catch (error) {
			alert("Wystąpił problem")
			console.log(error)
		}
	}

	render() {
		return (
			<Form
				onSubmit={this.onSubmit}
				validate={this.validate}
				initialValues={{ file: this.state.file }}
				render={({
					handleSubmit,
					submitting,
					values,
					invalid,
					pristine,
					active
				}) => {
					return (
						<form onSubmit={handleSubmit}>
							{/* Files (handled by separate component) */}
							<div>
								<Field
									name="file"
									isLoading={this.state.isLoading}
									component={FileHandlerSingle}
								/>
							</div>

							<div className="buttons">
								<LoaderButton
									text="Gotowe"
									type="submit"
									isLoading={submitting}
									disabled={submitting || pristine || this.state.isLoading}
								/>
							</div>
							{/* {process.env.NODE_ENV === "development" && (
								<pre>{JSON.stringify(values, 0, 2)}</pre>
							)} */}
						</form>
					)
				}}
			/>
		)
	}
}

export default compose(
	withRouter,
	withFirebase
)(AvatarChangeForm)
