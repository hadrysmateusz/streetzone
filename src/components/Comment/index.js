import React from "react"
import moment from "moment"
import StarRatings from "react-star-ratings"

import UserPreview from "../UserPreview"
import { IconButton } from "../Button"
import { CommentContainer, VerticalSeparator } from "./StyledComponents"

const Comment = ({ data }) => (
	<CommentContainer>
		<UserPreview id={data.author} vertical nameOnly />
		<div className="info-bar">
			<div className="info-bar-inner-container">
				<StarRatings
					rating={data.rating}
					starRatedColor="gold"
					numberOfStars={5}
					name="rating"
					starDimension="18px"
					starSpacing="2px"
				/>
				<VerticalSeparator />
				<div>{moment(data.createdAt).format("D.M.YYYY")}</div>
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
		<div>{data.comment}</div>
	</CommentContainer>
)

export default Comment
