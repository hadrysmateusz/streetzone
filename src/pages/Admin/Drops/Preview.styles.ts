import styled from "styled-components/macro"

import { ellipsis } from "../../../style-utils"

export const DropContainer = styled.div`
  border: 1px solid black;
  padding: var(--spacing3);
`

export const BuyAtLink = styled.a`
  ${ellipsis}
  display: block;
`

export const BuyAtList = styled.div`
  list-style: none;
  padding: 0;
  margin: 0;
`
