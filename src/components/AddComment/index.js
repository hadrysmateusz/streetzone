import React from "react"
import { Form } from "react-final-form"
import styled from "styled-components/macro"

import { LoaderButton, ButtonContainer } from "../Button"
import { TextareaFF, RatingFF } from "../FinalFormFields"
import { SmallTextBlock } from "../StyledComponents"

import { useFirebase, useAuthentication, useFlash } from "../../hooks"

import { RatingContainer, OuterContainer, Group } from "./StyledComponents"
import validate from "./validate"

const Heading = styled.div`
	font-size: var(--fs-m);
	font-weight: bold;
	margin-bottom: var(--spacing3);
	color: var(--black50);
`

const AddComment = ({ userId }) => {
	const firebase = useFirebase()
	const authUser = useAuthentication()
	const flashMessage = useFlash()

	const onSubmit = async (values, form) => {
		try {
			const authorId = authUser.uid

			const payload = {
				author: authorId,
				comment: values.comment,
				rating: values.rating,
				createdAt: Date.now()
			}

			const commentRef = firebase
				.user(userId)
				.collection("opinions")
				.doc(authorId)

			const commentDoc = await commentRef.get()

			const commentExisted = commentDoc.exists

			// Add opinion to opinions subcollection under the id of its author to enforce one comment per author
			await commentRef.set(payload)

			// Reset the form
			setTimeout(form.reset)

			flashMessage({
				type: "success",
				text: commentExisted ? "Opinia została edytowana" : "Dodano"
			})
		} catch (error) {
			console.error(error)
			flashMessage({
				type: "error",
				text: "Wystąpił błąd",
				details: "Komentarz mogł nie zostać dodany"
			})
		}
	}

	return (
		<OuterContainer>
			<Heading>Wystaw opinie o sprzedawcy</Heading>
			<Form
				onSubmit={onSubmit}
				validate={validate}
				render={({ handleSubmit, submitting, pristine }) => {
					return (
						<form onSubmit={handleSubmit}>
							<Group>
								{/* Comment */}
								<SmallTextBlock>Treść komentarza</SmallTextBlock>
								<TextareaFF name="comment" placeholder="Komentarz" />
							</Group>

							<Group>
								{/* Rating */}
								<SmallTextBlock>Ocena sprzedawcy</SmallTextBlock>
								<RatingContainer>
									<RatingFF name="rating" />
								</RatingContainer>
							</Group>

							<ButtonContainer noMargin>
								<LoaderButton
									text="Wystaw opinie"
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
		</OuterContainer>
	)
}

export default AddComment
