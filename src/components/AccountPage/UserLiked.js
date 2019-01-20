import React from "react"
import EmptyState from "../EmptyState"
import { EMPTY_STATES } from "../../constants"

const UserLiked = ({ liked }) => (
	<div>
		{liked && liked.length > 0 ? (
			<h3>Zapisane</h3>
		) : (
			<EmptyState state={EMPTY_STATES.UserNoLiked} />
		)}
	</div>
)

export default UserLiked
