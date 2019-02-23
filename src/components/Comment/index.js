import React from "react"
import moment from "moment"
import StarRatings from "react-star-ratings"

import UserPreview from "../UserPreview"
import { IconButton } from "../Button"
import { CommentContainer, VerticalSeparator } from "./StyledComponents"

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
						<IconButton small icon="flag" title="Zgłoś naruszenie">
							Flag
						</IconButton>
						<IconButton small icon="ellipsis-h" title="Więcej">
							More
						</IconButton>
					</div>
				</div>
				<div>{this.props.item.comment}</div>
			</CommentContainer>
		)
	}
}

export default Comment
