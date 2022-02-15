import { useRouteMatch } from "react-router-dom"

import {
  withAuthorization,
  isAuthenticated,
} from "../../../components/UserSession"
import { PageContainer } from "../../../components/Containers"
import UserPreview from "../../../components/UserPreview"
import PageHeading from "../../../components/PageHeading"

import { useUserData } from "../../../hooks"

import { OuterContainer, UserPreviewContainer } from "./NewChatPage.styles"
import { NewChat } from "./NewChat"

const NewChatPage = () => {
  const match = useRouteMatch()

  const userId = match.params.id

  const [user, error] = useUserData(userId)

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

export default withAuthorization(
  isAuthenticated,
  "Zaloguj się by skorzystać z czatu"
)(NewChatPage)
