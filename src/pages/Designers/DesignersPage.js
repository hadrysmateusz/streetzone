import { PageContainer } from "../../components/Containers"
import { StatefulSearchWrapper } from "../../components/InstantSearchWrapper"
import { PopularDesigners } from "../../components/PopularDesigners"
import { HelmetBasics } from "../../components/HelmetBasics"
import { CONST } from "../../constants"

import { Header } from "./DesignersPage.styles"
import { DesignersList } from "./DesignersList"

const DesignersPage = () => (
  <StatefulSearchWrapper
    indexName={CONST.DESIGNERS_ALGOLIA_INDEX}
    hitsPerPage={9999}
    ignoreArchivedStatus
  >
    <HelmetBasics title="Projektanci i Marki" />
    <PageContainer>
      <Header>Projektanci</Header>
      <PopularDesigners />
      <DesignersList />
    </PageContainer>
  </StatefulSearchWrapper>
)

export default DesignersPage
