import React from "react"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"

import EmptyState, { UserNoFeedback } from "../../components/EmptyState"
import { withFirebase } from "../../components/Firebase"
import LoadingSpinner from "../../components/LoadingSpinner"
import Comment from "../../components/Comment"
import AddComment from "../../components/AddComment"

class UserFeedback extends React.Component {
	state = { feedback: [], error: null, isLoading: true }

	getFeedback = async () => {
		this.setState({ isLoading: true })
		const userId = this.props.match.params.id
		const { user, error } = await this.props.firebase.getUserData(userId)

		// let feedback = await Promise.all(
		// 	user.feedback.map(async (a) => {
		// 		const userSnap = await this.props.firebase.user(a.author).get()
		// 		return userSnap.exists ? a : null
		// 	})
		// )
		// feedback = feedback.filter((a) => a !== null).reverse()

		this.setState({ feedback: user.feedback.reverse(), error, isLoading: false })
	}

	componentDidMount = async () => {
		await this.getFeedback()
	}

	render() {
		const { error, feedback, isLoading } = this.state
		const { isUserOwner } = this.props
		if (error) throw error

		return isLoading ? (
			<LoadingSpinner />
		) : (
			<div>
				{!isUserOwner && <AddComment refresh={this.getFeedback} />}
				<>
					{feedback && feedback.length > 0 ? (
						<div>
							{feedback.map((data) => {
								return <Comment data={data} />
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
