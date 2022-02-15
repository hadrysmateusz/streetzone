import LoadingSpinner from "../../../components/LoadingSpinner"
import { TextBlock } from "../../../components/StyledComponents"
import { PageContainer } from "../../../components/Containers"
// import UserPreview from "../../../components/UserPreview/BigUserPreview"

import { useLiveCollection } from "../../../hooks"

// import { List } from "../Common"

const UsersManagement = () => {
  const { /* results, isEmpty, */ isLoading } = useLiveCollection("users")

  return isLoading ? (
    <LoadingSpinner fixedHeight />
  ) : (
    <PageContainer>
      <TextBlock size="xl" bold>
        Użytkownicy
      </TextBlock>
      TODO
      {/* <List>{!isEmpty && results.map((user) => <UserPreview user={user} />)}</List> */}
    </PageContainer>
  )
}

export default UsersManagement
