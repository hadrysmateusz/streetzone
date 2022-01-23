import styled from "styled-components/macro"

import { ellipsis } from "../../../style-utils"

export const ModalOuterContainer = styled.div`
  max-width: 100vw;
  min-height: 520px;
  width: 490px;
  overflow: hidden;
`

export const Header = styled.div`
  padding: var(--spacing2) var(--spacing3);
  font-size: var(--fs-s);
  font-weight: var(--semi-bold);
  color: white;
  background: var(--black0);

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const IconContainer = styled.div`
  height: 100%;
  cursor: pointer;
`

export const List = styled.div`
  padding: 0 var(--spacing3);
  overflow-y: auto;
`

export const ListItem = styled.div`
  padding: var(--spacing3) 0;
  :not(:last-child) {
    border-bottom: 1px solid var(--gray75);
  }
`

export const StyledLink = styled.a`
  display: block;
  ${ellipsis}
`

export const GoToButton = styled.a`
  display: block;
  font-weight: var(--semi-bold);
  text-decoration: underline;
  > span {
    margin-right: 4px;
  }
`
