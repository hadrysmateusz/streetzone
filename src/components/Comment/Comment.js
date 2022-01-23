import moment from "moment"
import StarRatings from "react-star-ratings"
import { nanoid } from "nanoid"

import { useAuthentication, useFirebase, useFlash } from "../../hooks"

import { Text, SmallText, TextBlock } from "../StyledComponents"
import UserPreview from "../UserPreview/old"
import { ButtonContainer } from "../Button"
import MoreButton from "../MoreButton"

import { CommentContainer, Header, SubmenuItem } from "./Comment.styles"

const Comment = ({ author, rating, comment, createdAt, userId }) => {
  const authUser = useAuthentication()
  const firebase = useFirebase()
  const flashMessage = useFlash()

  const isAuthorized = !!authUser
  const isAuthor = isAuthorized && author === authUser.uid
  const formattedCreatedAt = moment(createdAt).format("LL")

  const deleteComment = async () => {
    try {
      // Delete the comment (author id is used as key in the opinions subcollection)
      await firebase.user(userId).collection("opinions").doc(author).delete()

      flashMessage({ type: "success", text: "Usunięto" })
    } catch (error) {
      console.error(error)
      flashMessage({ type: "error", text: "Wystąpił problem" })
    }
  }

  const reportComment = async () => {
    try {
      const reportId = nanoid()

      await firebase.db
        .collection("reportedComments")
        .doc(reportId)
        .set({ commentAuthor: author, reportAuthor: authUser.uid, commentedUser: userId })

      // TODO: add copy saying that action will be taken if the comment violates our rules
      flashMessage({ type: "success", text: "Komentarz został zgłoszony" })
    } catch (error) {
      console.error(error)
      flashMessage({
        type: "error",
        text: "Wystąpił problem",
        details: "Komentarz nie został zgłoszony, spróbuj ponownie później",
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