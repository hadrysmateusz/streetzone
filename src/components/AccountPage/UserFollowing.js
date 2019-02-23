import React from "react"
import EmptyState, { UserNoFollowing } from "../EmptyState"

import { withRouter } from "react-router-dom"
import { compose } from "recompose"

import { withFirebase } from "../Firebase"
import LoadingSpinner from "../LoadingSpinner"
import Comment from "../Comment"
import AddComment from "../AddComment"
import UserPreview from "../UserPreview"

class UserFollowing extends React.Component {
	state = { users: [], error: null, isLoading: true }

	getUsers = async () => {
		this.setState({ isLoading: true })
		const userId = this.props.match.params.id
		const { user, error } = await this.props.firebase.getUserData(userId)
		this.setState({ users: user.followedUsers, error, isLoading: false })
	}

	componentDidMount = async () => {
		await this.getUsers()
	}

	render() {
		const { error, users, isLoading } = this.state
		if (error) throw error

		return isLoading ? (
			<LoadingSpinner />
		) : (
			<div>
				{users && users.length > 0 ? (
					<div>
						{users.map((userId) => {
							return <UserPreview id={userId} />
						})}
					</div>
				) : (
					<EmptyState state={UserNoFollowing} />
				)}
			</div>
		)
	}
}

export default compose(
	withRouter,
	withFirebase
)(UserFollowing)
