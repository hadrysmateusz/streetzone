import React from "react"
import EmptyState, { UserNoFeedback } from "../EmptyState"

const UserFeedback = ({ feedback }) => (
	<div>
		{feedback && feedback.length > 0 ? (
			<h3>Opinie</h3>
		) : (
			<EmptyState state={UserNoFeedback} />
		)}
	</div>
)

export default UserFeedback
