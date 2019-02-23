import React, { Component } from "react"
import ProfileEditForm from "./ProfileEditForm"
import { withAuthentication } from "../UserSession"
import { withFirebase } from "../Firebase"
import { compose } from "recompose"
import LoadingSpinner from "../LoadingSpinner"

export class ProfileEdit extends Component {
	state = { isLoading: true, error: null, initialValues: null }

	getUserData = () => {
		this.setState({ isLoading: true })

		const user = this.props.authUser

		const initialValues = {
			name: user.name,
			email: user.email,
			city: user.city,
			phone: user.phone,
			info: user.info
		}

		this.setState({ initialValues, isLoading: false })
	}

	componentDidMount() {
		this.getUserData()
	}

	onSubmit = async (values, actions) => {
		const userId = this.props.authUser.uid
		const initialValues = this.state.initialValues

		const data = {
			name: values.name || initialValues.name || null,
			email: values.email || initialValues.email || null,
			city: values.city || null,
			phone: values.phone || null,
			info: values.info || null
		}

		// Update the user with the new list of comments
		await this.props.firebase.user(userId).update({ ...data })

		// Get the new information
		this.getUserData()

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
