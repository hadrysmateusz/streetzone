import React from "react"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"

import EmptyState, { UserNoFollowing } from "../../components/EmptyState"
import { withFirebase } from "../../components/Firebase"
import LoadingSpinner from "../../components/LoadingSpinner"
import FollowedUserCard from "../../components/FollowedUserCard"
import { FollowedUsersContainer } from "./StyledComponents"

class UserFollowing extends React.Component {
	state = { users: [], error: null, isLoading: true }

	getUserIds = async () => {
		this.setState({ isLoading: true })
		const userId = this.props.match.params.id
		const { user, error } = await this.props.firebase.getUserData(userId)
		this.setState({ users: user.followedUsers, error, isLoading: false })
	}

	componentDidMount = async () => {
		await this.getUserIds()
	}

	render() {
		const { error, users, isLoading } = this.state
		if (error) throw error

		return isLoading ? (
			<LoadingSpinner />
		) : (
			<div>
				{users && users.length > 0 ? (
					<FollowedUsersContainer>
						{users.map((userId) => {
							return <FollowedUserCard id={userId} />
						})}
					</FollowedUsersContainer>
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
