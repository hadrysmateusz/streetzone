import React from "react"

import LoadingSpinner from "../../components/LoadingSpinner"
import Comment from "../../components/Comment"
import AddComment from "../../components/AddComment"
import { PageContainer } from "../../components/Containers"
import EmptyState from "../../components/EmptyState"

import { useFirebase } from "../../hooks"

import { HeaderContainer } from "./Common"

const Header = ({ numFeedback = 0 }) => {
	return (
		<HeaderContainer>
			Opinie / Komentarze <div className="count">{numFeedback}</div>
		</HeaderContainer>
	)
}

const UserFeedback = ({ user, userId, isAuthorized, onForceRefresh }) => {
	const firebase = useFirebase()
	let feedback = [...user.feedback]
	feedback.sort((a, b) => b.createdAt - a.createdAt) /* put newest first */

	const onDelete = async (id) => {
		const newFeedback = feedback.filter((a) => a.id !== id)
		await firebase.user(userId).update({ feedback: newFeedback })
		onForceRefresh()
	}

	const numFeedback = feedback ? feedback.length : 0
	const hasUsers = numFeedback > 0
	const error = !feedback

	return !feedback ? (
		<LoadingSpinner />
	) : (
		<PageContainer maxWidth={2} extraWide>
			<Header numFeedback={numFeedback} />

			{!isAuthorized && (
				<AddComment user={user} userId={userId} onForceRefresh={onForceRefresh} />
			)}

			{error ? (
				<div>Wystąpił problem, spróbuj odświeżyć stronę</div>
			) : hasUsers ? (
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
			) : isAuthorized ? (
				<EmptyState header="Nie masz jeszcze żadnych opinii">
					Tutaj znajdziesz opinie wystawione przez innych użytkowników
				</EmptyState>
			) : (
				<EmptyState header="Ten użytkownik nie ma jeszcze żadnych opinii">
					Jeśli kupowałeś coś od tego użytkownika, wystaw opinie by pomóc innym
					użytkownikom
				</EmptyState>
			)}
		</PageContainer>
	)
}

export default UserFeedback
