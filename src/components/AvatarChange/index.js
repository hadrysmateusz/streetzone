import React from "react"
import { Form, Field } from "react-final-form"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"
import styled from "styled-components"

import Button, { LoaderButton } from "../Button"
import { FileHandlerSingle, CustomFile } from "../FileHandler"
import { withFirebase } from "../Firebase"
import { withAuthentication } from "../UserSession"
import getProfilePictureURL from "../../utils/getProfilePictureURL"

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
		this.loadImageFile()
	}

	loadImageFile = async () => {
		const { authUser } = this.props

		// TODO: this won't work for social signin photos as they don't have a ref
		if (authUser.profilePictureRef) {
			try {
				const file = new CustomFile({
					ref: authUser.profilePictureRef || null,
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

	onSubmit = async ({ file }, actions) => {
		try {
			const { firebase, authUser } = this.props

			// If file already has a ref there were no changes
			if (file && file.isUploaded) return

			// If there is no file, create empty ref
			// otherwise upload the new file and use its ref
			let newFileRef = null
			let newURL_temp = null
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

			// Get ref of current profile picture
			const oldFileRef = authUser.profilePictureRef || null

			// Update (or clear) profile picture ref and url in database
			await firebase.currentUser().update({
				profilePictureRef: newFileRef,
				profilePictureURLs: [newURL_temp]
			})

			// Remove old file
			if (oldFileRef) {
				await firebase.file(oldFileRef).delete()
			}

			// Reset form
			actions.reset()
			this.loadImageFile()
		} catch (error) {
			alert("Wystąpił problem")
			console.log(error)
		}
	}

	validate = ({ file }) => {
		const errors = {}
		return errors
	}

	render() {
		const { file, isLoading } = this.state

		return (
			<Container>
				<Form
					onSubmit={this.onSubmit}
					validate={this.validate}
					initialValues={{ file }}
					render={({ handleSubmit, submitting, pristine, form, values }) => {
						return (
							<form onSubmit={handleSubmit}>
								<Field name="file" isLoading={isLoading} component={FileHandlerSingle} />

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
	withFirebase,
	withAuthentication
)(AvatarChangeForm)
