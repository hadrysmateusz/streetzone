import { withBreakpoints } from "react-breakpoints"

import { SmallItemCard, BigItemCard } from "../Cards"

import { ItemsContainer, ItemsList } from "./ItemsView.styles"

const ItemsView = withBreakpoints(({ currentBreakpoint, items }) => {
  // only allow the grid view on smaller viewports
  const isMobile = currentBreakpoint < 1

  return isMobile ? (
    <ItemsContainer>
      {items.map((item) => (
        <SmallItemCard key={item.objectID} {...item} />
      ))}
    </ItemsContainer>
  ) : (
    <ItemsList>
      {items.map((item) => (
        <BigItemCard key={item.objectID} {...item} />
      ))}
    </ItemsList>
  )
})

export default ItemsView
