import { PageContainer } from "../../components/Containers"
import { route } from "../../utils"

import { ActionLink, Message, OuterContainer, StatusCode } from "./NotFoundPage.styles"

const NotFoundPage: React.FC = () => (
  <PageContainer>
    <OuterContainer>
      <StatusCode>404</StatusCode>
      <Message>Strona której szukasz nie istnieje</Message>
      <ActionLink to={route("HOME")}>Przejdź do strony głównej</ActionLink>
    </OuterContainer>
  </PageContainer>
)

export default NotFoundPage
