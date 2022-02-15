import { itemDataHelpers } from "../../utils"

import { DesignersContainer, PriceContainer, SizeContainer } from "./Common.styles"

const { formatDesigners, formatPrice, formatSize } = itemDataHelpers

export const Designers = ({ value }) => {
  const formatted = formatDesigners(value)
  return <DesignersContainer>{formatted}</DesignersContainer>
}

export const Size = ({ value }) => <SizeContainer>{formatSize(value)}</SizeContainer>

export const Price = ({ value }) => <PriceContainer>{formatPrice(value)}</PriceContainer>
