import React from "react"
import EmptyState from "../EmptyState"
import { EMPTY_STATES } from "../../constants"

const UserFeedback = ({ feedback }) => (
	<div>
		{feedback && feedback.length > 0 ? (
			<h3>Opinie</h3>
		) : (
			<EmptyState state={EMPTY_STATES.UserNoFeedback} />
		)}
	</div>
)

export default UserFeedback
