import React from "react"
import { Form, Field } from "react-final-form"
import { compose } from "recompose"
import uuidv1 from "uuid/v1"
import styled from "styled-components"

import Button, { LoaderButton } from "../Button"
import { FileHandlerSingle, CustomFile } from "../FileHandler"
import { withRouter } from "react-router-dom"
import { withFirebase } from "../Firebase"

const Container = styled.div`
	max-width: 460px;
	margin: 0 auto;
`

const ButtonContainer = styled.div`
	margin: 8px 0;
	display: flex;
	justify-content: stretch;
	* {
		flex: 1 1 0;
	}
`

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

		if (currentUserData.profilePictureRef) {
			let ref = this.props.firebase.storageRef.child(
				currentUserData.profilePictureRef
			)

			try {
				const imageURL = await ref.getDownloadURL()

				const file = new CustomFile({ ref: ref, previewUrl: imageURL })

				this.setState({ file })
			} catch (error) {
				console.log(error)
			}
		}
		this.setState({ isLoading: false })
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
				if (currentUserData.profilePictureRef) {
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
			if (currentUserData.profilePictureRef) {
				oldFileRef = currentUserData.profilePictureRef
			}

			// Update (or clear) profilePictureRef in database
			await currentUser.update({ profilePictureRef: newFileRef })

			// Remove old file
			if (oldFileRef) {
				await firebase.storageRef.child(oldFileRef).delete()
			}

			// TODO: reset form  and update this page instead of redirecting
			// Redirect to home page
			history.push("/")
			return
		} catch (error) {
			alert("Wystąpił problem")
			console.log(error)
		}
	}

	render() {
		const { file, isLoading } = this.state

		return (
			<Container width={500}>
				<Form
					onSubmit={this.onSubmit}
					validate={this.validate}
					initialValues={{ file }}
					render={({
						handleSubmit,
						submitting,
						values,
						invalid,
						pristine,
						active,
						form
					}) => {
						return (
							<form onSubmit={handleSubmit}>
								{/* Files (handled by separate component) */}

								<Field
									name="file"
									isLoading={isLoading}
									component={FileHandlerSingle}
								/>

								<ButtonContainer>
									<LoaderButton
										text="Gotowe"
										type="submit"
										isLoading={submitting}
										disabled={submitting || pristine || isLoading}
									/>
									<Button
										type="button"
										disabled={submitting || pristine || isLoading}
										onClick={() => form.reset()}
									>
										Anuluj
									</Button>
								</ButtonContainer>
								{/* {process.env.NODE_ENV === "development" && (
									<pre>{JSON.stringify(values, 0, 2)}</pre>
								)} */}
							</form>
						)
					}}
				/>
			</Container>
		)
	}
}

export default compose(
	withRouter,
	withFirebase
)(AvatarChangeForm)
