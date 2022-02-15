import styled from "styled-components/macro"

export const BuyAtGroup = styled.div`
  display: flex;
  > * + * {
    margin-left: 8px;
  }
`

export const Label = styled.div`
  font-weight: bold;
`
