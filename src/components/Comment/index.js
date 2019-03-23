import React from "react"
import moment from "moment"
import StarRatings from "react-star-ratings"

import UserPreview from "../UserPreview"
import { IconButton, ButtonContainer } from "../Button"

import { CommentContainer, Header } from "./StyledComponents"
import { Text, SmallText, TextBlock } from "../StyledComponents"

const Comment = ({ data }) => {
	const createdAt = moment(data.createdAt).format("D.M.YY")
	return (
		<CommentContainer>
			<Header>
				<UserPreview id={data.author} />
				<ButtonContainer alignRight>
					<IconButton icon="flag" title="Zgłoś naruszenie" />
					<IconButton icon="ellipsis-h" title="Więcej" />
				</ButtonContainer>
			</Header>

			<TextBlock>
				<SmallText>DODANO</SmallText>{" "}
				<Text size="xs" bold>
					{createdAt}
				</Text>
			</TextBlock>

			<TextBlock>
				<SmallText>OCENA</SmallText>{" "}
				<StarRatings
					rating={data.rating}
					starRatedColor="gold"
					numberOfStars={5}
					name="rating"
					starDimension="14px"
					starSpacing="2px"
				/>
			</TextBlock>

			<TextBlock>{data.comment}</TextBlock>
		</CommentContainer>
	)
}

export default Comment
