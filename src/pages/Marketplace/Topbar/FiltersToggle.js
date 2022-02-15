import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withBreakpoints } from "react-breakpoints"

import { FiltersToggleContainer, Toggle } from "./FiltersToggle.styles"

export const FiltersToggleButton = ({ onClick }) => {
  return (
    <Toggle onClick={onClick}>
      <FontAwesomeIcon icon="filter" />
      <span>Filtry</span>
    </Toggle>
  )
}

const FiltersToggle = ({ currentBreakpoint, toggleFilters }) => {
  return currentBreakpoint <= 2 ? (
    <FiltersToggleContainer>
      <Toggle onClick={toggleFilters}>
        <FontAwesomeIcon icon="filter" />
        <span>Filtry</span>
      </Toggle>
    </FiltersToggleContainer>
  ) : null
}

export default withBreakpoints(FiltersToggle)
