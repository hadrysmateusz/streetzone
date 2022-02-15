import styled, { css } from "styled-components/macro"
import { Link } from "react-router-dom"

export const OuterContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
    flex-flow: row wrap;
  }
  align-items: center;
  align-content: center;
  justify-content: space-between;
  color: white;
  background: var(--black0);

  /* Stay above fixed elements like the blog header */
  position: relative;
  z-index: 10;
`

export const IconContainer = styled.div`
  display: flex;
  font-size: 2.7rem;
  * + * {
    margin-left: var(--spacing3);
  }
`

const itemStyles = (p: { icon?: boolean }) => css`
  white-space: nowrap;
  color: var(--gray100);
  ${p.icon && "color: var(--black100);"}
  display: block;
  flex: 0 1;
  :not(${IconContainer}) {
    :hover {
      color: white;
      cursor: pointer;
    }
  }
`

export const Item = styled(Link)`
  ${(p: { icon?: boolean }) => itemStyles(p)}
`

export const ExternalItem = styled.a`
  ${(p: { icon?: boolean }) => itemStyles(p)}
`

export const InnerContainer = styled.div`
  padding: var(--spacing3) 0;
  width: 100%;
  max-width: ${(p) => p.theme.breakpoints[5]}px;
  margin: 0 auto;
  display: grid;
  align-content: center;
  align-items: flex-start;
  justify-content: space-between;

  flex-flow: row wrap;

  & > * {
    padding: var(--spacing2) var(--spacing3);
  }

  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    grid-template-columns: 2.5fr repeat(3, 1fr);
  }
`

export const Group = styled.div`
  > :first-child {
    margin-bottom: var(--spacing3);
  }
  > * {
    margin: var(--spacing2) 0;
  }
`
