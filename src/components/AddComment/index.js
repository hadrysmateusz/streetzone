import React from "react"
import { Form, Field } from "react-final-form"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"
import StarRatings from "react-star-ratings"

import { LoaderButton, ButtonContainer } from "../Button"
import { withFirebase } from "../Firebase"
import { FieldRow, FieldLabel, StyledTextarea } from "../Basics"
import { FormError } from "../FormElements"
import { withAuthentication } from "../UserSession"

import { RatingContainer, OuterContainer } from "./StyledComponents"
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
								<div>
									{/* Rating */}
									<FieldRow>
										<Field name="rating">
											{({ input, meta }) => (
												<>
													<FieldLabel>Ocena sprzedawcy</FieldLabel>
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

									{/* Comment */}
									<FieldRow>
										<Field name="comment">
											{({ input, meta }) => (
												<>
													<FieldLabel>Komentarz</FieldLabel>

													<StyledTextarea {...input} />
													<FormError
														message={meta.error}
														show={meta.error && meta.touched}
													/>
												</>
											)}
										</Field>
									</FieldRow>
								</div>

								<ButtonContainer centered>
									<LoaderButton
										text="Gotowe"
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
