import React from "react"

import EmptyState, { UserNoFeedback } from "../../components/EmptyState"
import LoadingSpinner from "../../components/LoadingSpinner"
import Comment from "../../components/Comment"
import AddComment from "../../components/AddComment"
import { PageContainer } from "../../components/Containers"

const UserFeedback = ({ user, userId, isAuthorized }) => {
	let feedback = user.feedback.reverse()

	return !feedback ? (
		<LoadingSpinner />
	) : (
		<PageContainer maxWidth={2}>
			{!isAuthorized && <AddComment refresh={() => console.log("asdf")} />}
			<>
				{feedback && feedback.length > 0 ? (
					<div>
						{feedback.map((data, i) => {
							return <Comment key={i} data={data} />
						})}
					</div>
				) : (
					<EmptyState state={UserNoFeedback} />
				)}
			</>
		</PageContainer>
	)
}

export default UserFeedback
