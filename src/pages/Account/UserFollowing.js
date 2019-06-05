import React, { useState, useEffect } from "react"

import EmptyState from "../../components/EmptyState"
import { PageContainer } from "../../components/Containers"
import { UsersView } from "../../components/UserPreview/big"

import { HeaderContainer } from "./Common"

const Header = ({ numUsers = 0 }) => {
	return (
		<HeaderContainer>
			Obserwowani użytkownicy {numUsers > 0 && <div className="count">{numUsers}</div>}
		</HeaderContainer>
	)
}

const UserSavedUsers = ({ user }) => {
	const [followedUsers, setFollowedUsers] = useState(null)

	// keep followedUsers in state and update only on uid change
	// to prevent accidentally unfollowing someone
	useEffect(() => {
		setFollowedUsers(user.followedUsers)
	}, [user.uid])

	const numUsers = followedUsers ? followedUsers.length : 0
	const hasUsers = numUsers > 0
	const error = !followedUsers

	return (
		<PageContainer extraWide>
			<Header numUsers={numUsers} />
			{error ? (
				<div>Wystąpił problem, spróbuj odświeżyć stronę</div>
			) : hasUsers ? (
				<UsersView users={followedUsers} />
			) : (
				<EmptyState text="Nie obserwujesz nikogo" />
			)}
		</PageContainer>
	)
}

export default UserSavedUsers
