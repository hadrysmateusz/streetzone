import { useLocation } from "react-router-dom"

import { getRedirectTo } from "../../utils"

import { LinkButton } from "../Button"
import EmptyState from "../EmptyState"

const ItemNotFound: React.FC = () => {
  const location = useLocation()

  const redirectTo = getRedirectTo(location)

  return (
    <EmptyState header="Nie znaleziono przedmiotu">
      <div>Być może został usunięty</div>
      <LinkButton to={redirectTo.pathname}>Wróć</LinkButton>
    </EmptyState>
  )
}

export default ItemNotFound
