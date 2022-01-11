import styled from "styled-components/macro"
import React from "react"
import { withBreakpoints } from "react-breakpoints"

import { SmallItemCard, BigItemCard } from "../Cards"

export const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
  justify-items: center;
  gap: 3px;
`

export const ItemsList = styled.div`
  display: grid;
  gap: var(--spacing3);
`

export const ItemsGrid = styled.div`
  display: grid;
  gap: var(--spacing2);
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
`

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
