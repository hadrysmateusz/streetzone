import React from "react"
import { Form, Field } from "react-final-form"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"
import StarRatings from "react-star-ratings"

import { LoaderButton, ButtonContainer } from "../Button"
import { withFirebase } from "../Firebase"
import { FieldRow } from "../Basics"
import { FormError, Textarea } from "../FormElements"
import { withAuthentication } from "../UserSession"
import { SmallTextBlock } from "../StyledComponents"

import { RatingContainer, OuterContainer, Group } from "./StyledComponents"
import validate from "./validate"

class AddComment extends React.Component {
	state = { error: null }

	onSubmit = async (values, actions) => {
		const userId = this.props.match.params.id
		const { user, error } = await this.props.firebase.getUserData(userId)

		if (error || !user) {
			this.setState({ error })
			return
		}

		// Push the new comment to the list of old ones
		user.feedback.push({
			author: this.props.authUser.uid,
			comment: values.comment || "",
			rating: values.rating || 3,
			createdAt: Date.now()
		})

		// Reset the form
		actions.reset()

		// Update the user with the new list of comments
		await this.props.firebase.user(userId).update({ feedback: user.feedback })

		// Refresh the page to display the new comment
		this.props.refresh()
	}

	render() {
		if (this.state.error) throw this.state.error
		return (
			<OuterContainer>
				<Form
					onSubmit={this.onSubmit}
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
												return (
													<Textarea {...input} placeholder="Komentarz" error={error} />
												)
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
}

export default compose(
	withRouter,
	withFirebase,
	withAuthentication
)(AddComment)
