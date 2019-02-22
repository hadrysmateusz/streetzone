import React from "react"
import EmptyState, { UserNoFeedback } from "../EmptyState"
import { Form, Field } from "react-final-form"
import { withFirebase } from "../Firebase"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"
import UserPreview from "../UserPreview"
import moment from "moment"
import StarRatings from "react-star-ratings"
import { LoaderButton, IconButton, ButtonContainer } from "../Button"
import { FieldRow, FieldLabel, StyledTextarea } from "../Basics"
import { FormError } from "../FormElements"
import { withAuthentication } from "../UserSession"
import { FORM_ERR, CONST } from "../../constants"
import styled from "styled-components"
import LoadingSpinner from "../LoadingSpinner"

const RatingContainer = styled.div`
	display: flex;
	justify-content: center;
	margin: 10px 0 15px 0;
`

const CommentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 40px;

	.info-bar {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 100%;
		height: 46px;
		padding: 10px 0;
		border-top: 1px solid ${(p) => p.theme.colors.gray[75]};
		border-bottom: 1px solid ${(p) => p.theme.colors.gray[75]};
		margin-bottom: 20px;
	}

	.info-bar-inner-container {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
	}

	.buttons-container {
		display: flex;
		position: absolute;
		right: 0;
		top: 0;
		padding: 10px;
	}
`

class Comment extends React.Component {
	state = { error: null }

	stopCommentRender = (error) => {
		console.log(error)
		this.setState({ error })
	}

	render() {
		return this.state.error ? null : (
			<CommentContainer>
				<UserPreview
					id={this.props.item.author}
					vertical
					nameOnly
					onError={this.stopCommentRender}
				/>
				<div className="info-bar">
					<div className="info-bar-inner-container">
						<StarRatings
							rating={this.props.item.rating}
							starRatedColor="gold"
							numberOfStars={5}
							name="rating"
							starDimension="18px"
							starSpacing="2px"
						/>
						<VerticalSeparator />
						<div>{moment(this.props.item.createdAt).format("D.M.YYYY")}</div>
					</div>
					<div className="buttons-container">
						<IconButton small icon="flag">
							Flag
						</IconButton>
						<IconButton small icon="ellipsis-h">
							More
						</IconButton>
					</div>
				</div>
				<div>{this.props.item.comment}</div>
			</CommentContainer>
		)
	}
}

const VerticalSeparator = styled.div`
	height: 100%;
	margin: 0 15px;
	width: 0;
	border-left: 1px solid ${(p) => p.theme.colors.gray[75]};
`

const validate = ({ rating, comment }) => {
	const errors = {}

	// Rating
	if (!rating) {
		errors.rating = FORM_ERR.IS_REQUIRED
	}

	// Comment
	if (!comment || comment.trim().length === 0) {
		errors.description = FORM_ERR.IS_REQUIRED
	} else if (comment && comment.length > CONST.COMMENT_MAX_CHARACTERS) {
		errors.description = FORM_ERR.DESC_TOO_LONG
	}

	return errors
}

const AddComment = compose(
	withRouter,
	withFirebase,
	withAuthentication
)(
	class extends React.Component {
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
				<div>
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
				</div>
			)
		}
	}
)

class UserFeedback extends React.Component {
	state = { feedback: [], error: null, isLoading: true }

	getFeedback = async () => {
		this.setState({ isLoadin: true })
		const userId = this.props.match.params.id
		const { user, error } = await this.props.firebase.getUserData(userId)
		this.setState({ feedback: user.feedback, error, isLoading: false })
	}

	componentDidMount = async () => {
		await this.getFeedback()
	}

	render() {
		const { error, feedback, isLoading } = this.state
		const { userIsOwner } = this.props
		if (error) throw error

		return isLoading ? (
			<LoadingSpinner />
		) : (
			<div>
				{!userIsOwner && <AddComment refresh={this.getFeedback} />}
				<>
					{feedback && feedback.length > 0 ? (
						<div>
							{feedback.map((item) => {
								return <Comment item={item} />
							})}
						</div>
					) : (
						<EmptyState state={UserNoFeedback} />
					)}
				</>
			</div>
		)
	}
}

export default compose(
	withRouter,
	withFirebase
)(UserFeedback)
