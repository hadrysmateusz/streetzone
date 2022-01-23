import styled, { css } from "styled-components/macro"
import { NavLink } from "react-router-dom"

export const Nav = styled.nav`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  margin: var(--spacing2) 0;
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    margin: var(--spacing4) 0;
  }
`

const navCommon = css`
  color: var(--gray25);
  font-weight: var(--semi-bold);
  font-size: var(--fs-xs);
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 var(--spacing2);
  box-sizing: padding-box;
  border-bottom: 1px solid var(--gray75);
  transition: border-color 0.25s linear, border-width 0.25s linear;

  &:hover {
    color: black;
  }

  &.active {
    color: black;
    border-bottom: 3px solid black;
  }
`

export const NavItem = styled.div`
  ${navCommon}
`

export const StyledNavLink = styled(NavLink)`
  ${navCommon}
`

export const SubmenuNavItem = styled(NavLink)`
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-size: var(--fs-xs);
  font-weight: var(--semi-bold);
  color: var(--gray25);

  :hover {
    background: var(--almost-white);
  }

  &.active {
    color: black;
    font-weight: bold;
  }
`

export const SubmenuOuterContainer = styled.div`
  position: relative;
`

export const SubmenuContainer = styled.div`
  position: absolute;
  top: 100%;
  min-width: 100%;

  ${(p) => `${p.align}: 0;`}
  z-index: 996;

  padding-top: var(--spacing3);
`
