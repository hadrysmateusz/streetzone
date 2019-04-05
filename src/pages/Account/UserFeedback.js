import React from "react"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"

import EmptyState, { UserNoFeedback } from "../../components/EmptyState"
import { withFirebase } from "../../components/Firebase"
import LoadingSpinner from "../../components/LoadingSpinner"
import Comment from "../../components/Comment"
import AddComment from "../../components/AddComment"
import { PageContainer } from "../../components/Containers"

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
		const { isAuthorized } = this.props
		if (error) throw error

		return isLoading ? (
			<LoadingSpinner />
		) : (
			<PageContainer maxWidth={2}>
				{!isAuthorized && <AddComment refresh={this.getFeedback} />}
				<>
					{feedback && feedback.length > 0 ? (
						<div>
							{feedback.map((data, i) => {
								return <Comment key={i} data={data} />
							})}
						</div>
					) : (
						<EmptyState state={UserNoFeedback} />
					)}
				</>
			</PageContainer>
		)
	}
}

export default compose(
	withRouter,
	withFirebase
)(UserFeedback)
