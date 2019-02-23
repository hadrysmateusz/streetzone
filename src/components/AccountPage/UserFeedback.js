import React from "react"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"

import EmptyState, { UserNoFeedback } from "../EmptyState"
import { withFirebase } from "../Firebase"
import LoadingSpinner from "../LoadingSpinner"
import Comment from "../Comment"
import AddComment from "../AddComment"

class UserFeedback extends React.Component {
	state = { feedback: [], error: null, isLoading: true }

	getFeedback = async () => {
		this.setState({ isLoading: true })
		const userId = this.props.match.params.id
		const { user, error } = await this.props.firebase.getUserData(userId)

		this.setState({ feedback: user.feedback.reverse(), error, isLoading: false })
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
