import { useState, useEffect } from "react"

import { PageContainer } from "../../components/Containers"
import { UsersView } from "../../components/UserPreview/BigUserPreview"
import EmptyState from "../../components/EmptyState"

import { Header } from "./Header"

const UserSavedUsers = ({ user }) => {
  const [followedUsers, setFollowedUsers] = useState(null)

  // keep followedUsers in state and update only on uid change
  // to prevent accidentally unfollowing someone
  useEffect(() => {
    setFollowedUsers(user.followedUsers)
  }, [user.followedUsers])

  const numUsers = followedUsers ? followedUsers.length : 0
  const hasUsers = numUsers > 0
  const error = !followedUsers

  return (
    <PageContainer extraWide>
      <Header count={numUsers}>Obserwowani użytkownicy</Header>
      {error ? (
        <div>Wystąpił problem, spróbuj odświeżyć stronę</div>
      ) : hasUsers ? (
        <UsersView users={followedUsers} />
      ) : (
        <EmptyState header="Nie obserwujesz jeszcze nikogo">
          Tutaj znajdziesz zaobserwowanych przez siebie użytkowników
        </EmptyState>
      )}
    </PageContainer>
  )
}

export default UserSavedUsers
