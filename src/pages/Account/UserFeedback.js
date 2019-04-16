import React from "react"

import EmptyState, { UserNoFeedback } from "../../components/EmptyState"
import LoadingSpinner from "../../components/LoadingSpinner"
import Comment from "../../components/Comment"
import AddComment from "../../components/AddComment"
import { PageContainer } from "../../components/Containers"
import { useFirebase } from "../../hooks"

const UserFeedback = ({ user, userId, isAuthorized, onForceRefresh }) => {
	const firebase = useFirebase()
	let feedback = [...user.feedback]
	feedback.sort((a, b) => b.createdAt - a.createdAt) /* put newest first */

	const onDelete = async (id) => {
		const newFeedback = feedback.filter((a) => a.id !== id)
		await firebase.user(userId).update({ feedback: newFeedback })
		onForceRefresh()
		// TODO: the dropdown is not closed when the item is deleted
	}

	return !feedback ? (
		<LoadingSpinner />
	) : (
		<PageContainer maxWidth={2}>
			{!isAuthorized && (
				<AddComment user={user} userId={userId} onForceRefresh={onForceRefresh} />
			)}
			<>
				{feedback && feedback.length > 0 ? (
					<div>
						{feedback.map((data) => {
							return (
								<Comment
									key={data.id}
									{...data}
									user={user}
									userId={userId}
									onDelete={onDelete}
								/>
							)
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
