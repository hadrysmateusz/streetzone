import React from "react"

import EmptyState, { UserNoFollowing } from "../../components/EmptyState"
import LoadingSpinner from "../../components/LoadingSpinner"
import FollowedUserCard from "../../components/FollowedUserCard"
import { FollowedUsersContainer } from "./StyledComponents"

const UserFollowing = ({ user, userId, isAuthorized }) => {
	const { followedUsers } = user

	const hasUsers = followedUsers && followedUsers.length > 0

	return !followedUsers ? (
		<LoadingSpinner />
	) : hasUsers ? (
		<FollowedUsersContainer>
			{followedUsers.map((userId) => {
				return <FollowedUserCard id={userId} />
			})}
		</FollowedUsersContainer>
	) : (
		<EmptyState state={UserNoFollowing} />
	)
}

export default UserFollowing
