import { useState } from "react"
import { connectRefinementList } from "react-instantsearch-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"

import { AdaptiveFoldable } from "../../Foldable"

import SearchBox from "./SearchBox"
import { BoxOptionsList, OptionsList } from "./OptionsList"
import { MoreButtonContainer, SearchBoxContainer } from "./AlgoliaRefinementList.styles"

const MoreButton = ({ toggleMenu, isMenuOpen }) => (
  <MoreButtonContainer onClick={toggleMenu}>
    <FontAwesomeIcon icon={isMenuOpen ? "minus" : "plus"} size="xs" />
    {isMenuOpen ? " MNIEJ" : " WIĘCEJ"}
  </MoreButtonContainer>
)

const RefinementList = ({
  items,
  refine,
  searchable,
  multiColumn,
  show,
  currentBreakpoint,
  currentRefinement,
  boxGrid,
  searchForItems,
  ...rest
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen((state) => !state)

  const hasRefinements = currentRefinement && currentRefinement.length !== 0
  const hasItems = items && items.length > 0
  const hasMore = hasItems && show && items.length > show

  /* if the show prop is provided limit the number of items displayed
	based on whether the menu is toggled or not */
  let itemsToShow = show && isMenuOpen ? items : items.slice(0, show)

  return (
    <AdaptiveFoldable {...rest} showClear={hasRefinements}>
      {/* Search bar */}
      {searchable && (
        <SearchBoxContainer>
          <SearchBox search={searchForItems} />
        </SearchBoxContainer>
      )}

      {/* Refinement list */}
      {boxGrid ? (
        <BoxOptionsList items={itemsToShow} refine={refine} />
      ) : (
        <OptionsList items={itemsToShow} refine={refine} multiColumn={multiColumn} />
      )}

      {/* More button */}
      {hasMore && <MoreButton toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />}
    </AdaptiveFoldable>
  )
}

export default compose(withBreakpoints, connectRefinementList)(RefinementList)

// export const BasicRefinementList = connectRefinementList(
//   ({
//     items,
//     refine,
//     multiColumn,
//     show,
//     currentRefinement,
//     currentBreakpoint,
//     boxGrid,
//     ...rest
//   }) => {
//     let itemsToShow = show ? items : items.slice(0, show)

//     return <OptionsList items={itemsToShow} refine={refine} multiColumn={multiColumn} />
//   }
// )
