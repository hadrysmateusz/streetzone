import React from "react"
import EmptyState, { UserNoFollowing } from "../EmptyState"

const UserFollowing = ({ following }) => (
	<div>
		{following && following.length > 0 ? (
			<h3>Opinie</h3>
		) : (
			<EmptyState state={UserNoFollowing} />
		)}
	</div>
)

export default UserFollowing
