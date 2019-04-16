import React from "react"
import moment from "moment"
import StarRatings from "react-star-ratings"

import UserPreview from "../UserPreview"
import { IconButton, ButtonContainer } from "../Button"
import MoreButton from "../MoreButton"
import { Text, SmallText, TextBlock } from "../StyledComponents"

import { CommentContainer, Header } from "./StyledComponents"
import { useAuthentication } from "../../hooks"

const Comment = ({ author, rating, comment, createdAt, id, onDelete }) => {
	const [authUser, isAuthorized] = useAuthentication(true)

	const isAuthor = isAuthorized && author === authUser.uid

	const formattedCreatedAt = moment(createdAt).format("D.M.YY")

	return (
		<CommentContainer>
			<Header>
				<UserPreview id={author} />
				<ButtonContainer alignRight>
					{/* <IconButton icon="flag" title="Zgłoś naruszenie" /> */}
					<MoreButton icon="ellipsis-h" title="Więcej">
						{isAuthor && <div onClick={() => onDelete(id)}>Usuń</div>}
						<div>Zgłoś naruszenie</div>
					</MoreButton>
				</ButtonContainer>
			</Header>

			<TextBlock>
				<SmallText>DODANO</SmallText>{" "}
				<Text size="xs" bold>
					{formattedCreatedAt}
				</Text>
			</TextBlock>

			<TextBlock>
				<SmallText>OCENA</SmallText>{" "}
				<StarRatings
					rating={rating}
					starRatedColor="gold"
					numberOfStars={5}
					name="rating"
					starDimension="14px"
					starSpacing="2px"
				/>
			</TextBlock>

			<TextBlock>{comment}</TextBlock>
		</CommentContainer>
	)
}

export default Comment
