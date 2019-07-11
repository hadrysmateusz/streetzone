import React from "react"
import { Form, Field } from "react-final-form"
import StarRatings from "react-star-ratings"
import shortid from "shortid"

import { LoaderButton, ButtonContainer } from "../Button"
import { FieldRow } from "../Basics"
import { FormError, Textarea } from "../FormElements"
import { SmallTextBlock, TextBlock } from "../StyledComponents"

import { useFirebase, useAuthentication } from "../../hooks"

import { RatingContainer, OuterContainer, Group } from "./StyledComponents"
import validate from "./validate"

const AddComment = ({ user, userId, onForceRefresh }) => {
	const firebase = useFirebase()
	const authUser = useAuthentication()

	const onSubmit = async (values, actions) => {
		// Push the new comment to the list of old ones
		user.feedback.push({
			id: shortid.generate(),
			author: authUser.uid,
			comment: values.comment,
			rating: values.rating,
			createdAt: Date.now()
		})

		// Reset the form
		actions.reset()

		// Update
		firebase.user(userId).update({ feedback: user.feedback })

		// Refresh the list
		onForceRefresh()
	}

	return (
		<OuterContainer>
			<TextBlock size="m" bold mb="var(--spacing2)" color="black50">
				Wystaw opinie o sprzedawcy
			</TextBlock>
			<Form
				onSubmit={onSubmit}
				validate={validate}
				render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
					return (
						<form onSubmit={handleSubmit}>
							<Group>
								{/* Comment */}
								<SmallTextBlock>Treść komentarza</SmallTextBlock>
								<FieldRow>
									<Field name="comment">
										{({ input, meta }) => {
											const error = meta.error && meta.touched ? meta.error : null
											return <Textarea {...input} placeholder="Komentarz" error={error} />
										}}
									</Field>
								</FieldRow>
							</Group>

							<Group>
								{/* Rating */}
								<SmallTextBlock>Ocena sprzedawcy</SmallTextBlock>
								<FieldRow>
									<Field name="rating">
										{({ input, meta }) => (
											<>
												<RatingContainer>
													<StarRatings
														rating={+input.value}
														changeRating={input.onChange}
														starRatedColor="gold"
														starHoverColor="#ffc311"
														numberOfStars={5}
														starDimension="20px"
														starSpacing="2px"
													/>
												</RatingContainer>
												<FormError
													message={meta.error}
													show={meta.error && meta.touched}
												/>
											</>
										)}
									</Field>
								</FieldRow>
							</Group>

							<ButtonContainer noMargin>
								<LoaderButton
									text="Wystaw opinie"
									type="submit"
									isLoading={submitting}
									disabled={submitting || pristine}
									primary
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
