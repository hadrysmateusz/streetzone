import { withRouter } from "react-router-dom"

import { getRedirectTo } from "../../utils"

import { LinkButton } from "../Button"
import EmptyState from "../EmptyState"

const ItemNotFound = withRouter(({ location }) => (
  <EmptyState header="Nie znaleziono przedmiotu">
    <div>Być może został usunięty</div>
    <LinkButton to={getRedirectTo(location)}>Wróć</LinkButton>
  </EmptyState>
))

export default ItemNotFound
