import React, { useState, useEffect } from "react"

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

const UserFeedback = ({ user, userId, isAuthorized }) => {
	const firebase = useFirebase()
	const [opinions, setOpinions] = useState([])
	const [isEmpty, setIsEmpty] = useState(false)

	// TODO: add orderBy, where and complex path functionality to useLiveCollection and useCollection
	useEffect(() => {
		const unsubscribe = firebase
			.user(userId)
			.collection("opinions")
			.orderBy("createdAt", "desc")
			.onSnapshot((snap) => {
				if (snap.empty) {
					setIsEmpty(true)
					setOpinions([])
					return
				} else {
					setIsEmpty(false)
				}

				setOpinions(snap.docs.map((doc) => doc.data()))
			})

		return unsubscribe
	}, [firebase, firebase.db, userId])

	const numOpinions = opinions ? opinions.length : 0
	const isLoading = !isEmpty && !opinions

	return isLoading ? (
		<LoadingSpinner />
	) : (
		<PageContainer maxWidth={2} extraWide>
			<Header numFeedback={numOpinions} />

			{!isAuthorized && <AddComment userId={userId} />}

			{!isEmpty ? (
				<div>
					{opinions.map((data) => (
						<Comment key={data.author} {...data} userId={userId} />
					))}
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
