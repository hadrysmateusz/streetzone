import React from "react"
import moment from "moment"
import StarRatings from "react-star-ratings"
import styled from "styled-components/macro"
import shortid from "shortid"

import UserPreview from "../UserPreview/old"
import { ButtonContainer } from "../Button"
import MoreButton from "../MoreButton"
import { Text, SmallText, TextBlock } from "../StyledComponents"

import { CommentContainer, Header } from "./StyledComponents"
import { useAuthentication, useFirebase, useFlash } from "../../hooks"

export const SubmenuItem = styled.div`
	text-align: center;
	text-decoration: none;
	text-transform: uppercase;
	font-size: var(--fs-xs);
	font-weight: var(--semi-bold);
	color: var(--black100);
	cursor: pointer;
	padding: var(--spacing2) var(--spacing3);

	:hover {
		background: var(--almost-white);
		color: black;
	}
`

const Comment = ({ author, rating, comment, createdAt, userId }) => {
	const [authUser, isAuthorized] = useAuthentication(true)
	const firebase = useFirebase()
	const flashMessage = useFlash()

	const isAuthor = isAuthorized && author === authUser.uid
	const formattedCreatedAt = moment(createdAt).format("LL")

	const deleteComment = async () => {
		try {
			// Delete the comment (author id is used as key in the opinions subcollection)
			await firebase
				.user(userId)
				.collection("opinions")
				.doc(author)
				.delete()

			flashMessage({ type: "success", text: "Usunięto" })
		} catch (error) {
			console.log(error)
			flashMessage({ type: "error", text: "Wystąpił problem" })
		}
	}

	const reportComment = async () => {
		try {
			const reportId = shortid.generate()

			await firebase.db
				.collection("reportedComments")
				.doc(reportId)
				.set({ commentAuthor: author, reportAuthor: authUser.uid, commentedUser: userId })

			// TODO: add copy saying that action will be taken if the comment violates our rules
			flashMessage({ type: "success", text: "Komentarz został zgłoszony" })
		} catch (error) {
			console.log(error)
			flashMessage({
				type: "error",
				text: "Wystąpił problem",
				details: "Komentarz nie został zgłoszony, spróbuj ponownie później"
			})
		}
	}

	return (
		<CommentContainer>
			<Header>
				<UserPreview id={author} />
				<ButtonContainer alignRight>
					{/* <IconButton icon="flag" title="Zgłoś naruszenie" /> */}
					<MoreButton icon="ellipsis-h" title="Więcej">
						{isAuthor && <SubmenuItem onClick={deleteComment}>Usuń</SubmenuItem>}
						<SubmenuItem onClick={reportComment}>Zgłoś naruszenie</SubmenuItem>
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
