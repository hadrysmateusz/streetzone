import { compose } from "recompose"
import { withRouter } from "react-router-dom"

import { withAuthorization } from "../../../components/UserSession"
import { PageContainer } from "../../../components/Containers"
import UserPreview from "../../../components/UserPreview"
import PageHeading from "../../../components/PageHeading"

import { useUser } from "../../../hooks"

import { OuterContainer, UserPreviewContainer } from "./NewChatPage.styles"
import { NewChat } from "./NewChat"

const NewChatPage = ({ match }) => {
  const userId = match.params.id

  const [user, error] = useUser(userId)

  if (error) throw new Error("Nie znaleziono użytkownika")

  return user ? (
    <PageContainer>
      <OuterContainer>
        <PageHeading emoji={"💬"}>Napisz do {user.name}</PageHeading>
        <UserPreviewContainer>
          <UserPreview user={user} noButton />
        </UserPreviewContainer>
        <NewChat userId={userId} flexibleTextarea />
      </OuterContainer>
    </PageContainer>
  ) : null
}

const condition = (authUser) => !!authUser

export default compose(withRouter, withAuthorization(condition))(NewChatPage)
