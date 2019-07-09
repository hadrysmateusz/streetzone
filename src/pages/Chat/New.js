import React from "react"
import { compose } from "recompose"
import { withRouter } from "react-router-dom"
import shortid from "shortid"
import { Form, Field } from "react-final-form"
import styled, { css } from "styled-components/macro"

import { withAuthorization } from "../../components/UserSession"
import { PageContainer } from "../../components/Containers"
import { LoaderButton, ButtonContainer } from "../../components/Button"
import { Textarea } from "../../components/FormElements"
import UserPreview from "../../components/UserPreview/new"
import PageHeading from "../../components/PageHeading"

import { useFirebase, useAuthentication, useUser } from "../../hooks"

const OuterContainer = styled.div`
	max-width: 430px;
	margin: 0 auto;
`

const UserPreviewContainer = styled.div`
	margin-bottom: var(--spacing3);
`

const validate = (values) => {
	const errors = {}

	return errors
}

export const NewChat = ({ userId, flexibleTextarea = false }) => {
	const authUser = useAuthentication()
	const firebase = useFirebase()

	const onSubmit = async (values, actions) => {
		const message = values.message

		actions.reset()

		let roomId
		const messageId = shortid.generate()
		const senderId = authUser.uid
		const recipientId = userId

		// get common room for both users
		let roomSnap = await firebase
			.currentUser()
			.collection("rooms")
			.doc(userId)
			.get()

		// Create room if it doesn't exist yet
		if (!roomSnap.exists) {
			roomId = shortid.generate()

			// create room in the rooms collection
			await firebase.db
				.collection("rooms")
				.doc(roomId)
				.set({ id: roomId, userA: senderId, userB: recipientId })

			// Add room of recipient to sender
			await firebase
				.user(senderId)
				.collection("rooms")
				.doc(recipientId)
				.set({ id: roomId, otherUserId: recipientId })

			// Add room of sender to recipient
			await firebase
				.user(recipientId)
				.collection("rooms")
				.doc(senderId)
				.set({ id: roomId, otherUserId: senderId })
		} else {
			roomId = roomSnap.data().id
		}

		// add message to room
		await firebase.db
			.collection("rooms")
			.doc(roomId)
			.collection("messages")
			.doc(messageId)
			.set({
				id: messageId,
				createdAt: Date.now(),
				message,
				author: senderId,
				unread: true
			})
	}

	return (
		<Form
			onSubmit={onSubmit}
			validate={validate}
			render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
				return (
					<form onSubmit={handleSubmit}>
						{/* Comment */}
						<Field name="message">
							{({ input, meta }) => {
								const error = meta.error && meta.touched ? meta.error : null
								return (
									<Textarea
										{...input}
										autoResize={flexibleTextarea ? true : false}
										numberOfLines={flexibleTextarea ? undefined : 3}
										placeholder="Wiadomość"
										error={error}
									/>
								)
							}}
						</Field>

						<ButtonContainer>
							<LoaderButton
								text="Wyślij"
								type="submit"
								isLoading={submitting}
								disabled={submitting || pristine}
								primary
								big
								fullWidth
							/>
						</ButtonContainer>
					</form>
				)
			}}
		/>
	)
}

const NewChatPage = ({ match }) => {
	const userId = match.params.id

	const [user, error] = useUser(userId)

	if (error) throw new Error("Nie znaleziono użytkownika")

	return user ? (
		<PageContainer>
			<OuterContainer>
				<PageHeading emoji={"💬"}>Napisz do {user.name}</PageHeading>
				<UserPreviewContainer>
					<UserPreview user={user} noButton />
				</UserPreviewContainer>
				<NewChat userId={userId} flexibleTextarea />
			</OuterContainer>
		</PageContainer>
	) : null
}

const condition = (authUser) => !!authUser

export default compose(
	withRouter,
	withAuthorization(condition)
)(NewChatPage)
