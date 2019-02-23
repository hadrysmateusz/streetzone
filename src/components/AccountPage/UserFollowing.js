import React from "react"
import EmptyState, { UserNoFollowing } from "../EmptyState"

const UserFollowing = ({ following }) => (
	<div>
		{following && following.length > 0 ? <div /> : <EmptyState state={UserNoFollowing} />}
	</div>
)

export default UserFollowing
