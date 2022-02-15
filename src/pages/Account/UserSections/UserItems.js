import { Link } from "react-router-dom"

import { StatelessSearchWrapper } from "../../../components/InstantSearchWrapper"
import InfiniteScrollingResults from "../../../components/InfiniteScrollingResults"
import { PageContainer } from "../../../components/Containers"
import { OwnerItemCard } from "../../../components/Cards"
import { Button } from "../../../components/Button"
import ItemsView from "../../../components/ItemsView"
import EmptyState from "../../../components/EmptyState"
import { SaveButton } from "../../../components/SaveButton"

import { CONST } from "../../../constants"
import { route } from "../../../utils"

import { ItemsList } from "../Common.styles"
import { ConnectedHeader } from "../HelperComponents"

const ItemsResults = ({ isAuthorized, userId }) => {
  return isAuthorized ? (
    <InfiniteScrollingResults
      emptyState={
        <EmptyState header="Nie wystawiłeś jeszcze żadnego przedmiotu">
          <Button as={Link} to={route("NEW_ITEM")} primary>
            Zacznij sprzedawać
          </Button>
        </EmptyState>
      }
    >
      {({ results }) => (
        <ItemsList>
          {results.map((item) => (
            <OwnerItemCard key={item.id} {...item} />
          ))}
        </ItemsList>
      )}
    </InfiniteScrollingResults>
  ) : (
    <InfiniteScrollingResults
      emptyState={
        <EmptyState header="Ten użytkownik nie wystawił aktualnie żadnego przedmiotu">
          <div>Obserwuj by dowiedzieć się gdy coś wystawi</div>
          <SaveButton type="user" id={userId} fullWidth />
        </EmptyState>
      }
    >
      {({ results }) => <ItemsView items={results} />}
    </InfiniteScrollingResults>
  )
}

const UserItems = ({ isAuthorized, userId }) => (
  <PageContainer extraWide>
    <StatelessSearchWrapper
      indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
      refinements={{ userId }}
      limit={6}
    >
      <ConnectedHeader>Wszystkie przedmioty</ConnectedHeader>
      <ItemsResults isAuthorized={isAuthorized} userId={userId} />
    </StatelessSearchWrapper>
  </PageContainer>
)

export default UserItems