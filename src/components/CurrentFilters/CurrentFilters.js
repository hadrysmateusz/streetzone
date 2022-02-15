import { connectCurrentRefinements } from "react-instantsearch-core"
import { compose } from "recompose"
import { useHistory } from "react-router-dom"
import { withBreakpoints } from "react-breakpoints"

import { itemDataHelpers, route } from "../../utils"

import { ResultsCount } from "../ResultsCount"

import {
  ClearFiltersButton,
  Container,
  Item,
  OuterContainer,
} from "./CurrentFilters.styles"

const { formatSize } = itemDataHelpers

const CurrentFilters = ({ items, clearFilters, currentBreakpoint }) => {
  const history = useHistory()

  // ignore the isArchived refinement
  items = items.filter((a) => a.attribute !== "isArchived")

  return items && items.length > 0 ? (
    <OuterContainer>
      <Container>
        {items.map((item) => {
          if (item.attribute === "price") {
            return <Item key={item.attribute}>Cena</Item>
          } else if (item.attribute === "size") {
            return item.currentRefinement.map((refinement) => (
              <Item key={refinement}>{formatSize(refinement)}</Item>
            ))
          } else {
            return item.currentRefinement.map((refinement) => (
              <Item key={refinement}>{refinement}</Item>
            ))
          }
        })}
        {items && items.length > 0 && (
          <ClearFiltersButton
            onClick={() => {
              history.replace(route("MARKETPLACE"))
              clearFilters()
            }}
          >
            Wyczyść wszystko
          </ClearFiltersButton>
        )}
      </Container>
      {+currentBreakpoint >= 1 && <ResultsCount />}
    </OuterContainer>
  ) : null
}

export default compose(
  connectCurrentRefinements,
  withBreakpoints
)(CurrentFilters)
