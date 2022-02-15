import { NavLink } from "react-router-dom"
import styled, { css } from "styled-components/macro"

import { swingInFwdTopAnimation } from "../../style-utils"

const pageHeaderContainerCommon = css`
  width: 100%;
  max-width: ${(p) => p.theme.breakpoints[5]}px;
  margin: 0 auto;
  height: 100%;
  padding: 0 var(--spacing3);
  grid-template-rows: 100%;
`

export const PageHeaderContainerDesktop = styled.header`
  ${pageHeaderContainerCommon};
  display: grid;
  grid-template-columns: auto 1fr auto;
`

export const PageHeaderContainerMobile = styled.header`
  ${pageHeaderContainerCommon};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr;

  .align-right {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    > * + * {
      margin-left: var(--spacing3);
    }
  }
`

export const PageHeaderOuter = styled.div<{ scrollPosition?: number }>`
  height: var(--page-header-height);

  position: sticky;
  top: 0;
  z-index: 80;
  background: white;
  border-bottom: 1px solid var(--gray75);
  transition: border-color 0.14s linear;
  margin-bottom: var(--spacing4);
  /* ${(p) =>
    p.scrollPosition !== 0 ? "border-color: var(--gray75);" : undefined} */
`

export const SubmenuContainer = styled.div<{ align: "right" | "left" }>`
  position: absolute;
  top: 100%;
  ${(p) => `${p.align}: 0;`}
  z-index: 90;
  display: none;
`

export const NavItem = styled.div`
  user-select: none;
  position: relative;
  white-space: nowrap;
  color: var(--gray0);
  display: block;

  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    :hover > ${SubmenuContainer} {
      display: block;
    }
  }

  > :first-child {
    height: 100%;
  }
`

export const Nav = styled.nav<{
  main?: boolean
  alignRight?: boolean
  centered?: boolean
}>`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min-content;
  grid-template-rows: 100%;
  gap: var(--spacing2);
  ${(p) => p.main && "padding-left: var(--spacing4);"}

  > * {
    height: 100%;
  }

  @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
    gap: var(--spacing3);
  }
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    ${(p) => p.main && "gap: var(--spacing4);"}
  }
  ${(p) => p.alignRight && "justify-content: flex-end;"}
  ${(p) => p.centered && "justify-content: center;"}
`

export const Submenu = styled.div`
  ${swingInFwdTopAnimation};
  padding: var(--spacing2) 0;
  background: var(--black0);
  box-shadow: 0 5px 10px -2px rgba(0, 0, 0, 0.3);
`

export const IconContainer = styled.div`
  cursor: pointer;
  font-size: 1.6rem;
  color: black;
`

const linkCommon = css`
  user-select: none;
  position: relative;
  white-space: nowrap;

  display: flex;
  align-items: center;
  background: none;

  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 11px;
`

export const DesktopNavLink = styled(NavLink)`
  ${linkCommon};
  padding: 0;
  color: var(--gray25);
  font-weight: var(--semi-bold);

  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    :hover > ${SubmenuContainer} {
      display: block;
    }
  }

  &:hover {
    color: black;
  }

  &.active {
    color: black;
    font-weight: bold;
  }
`

const submenuItemCommon = css`
  ${linkCommon};
  padding: var(--spacing2) var(--spacing3);
  color: white;
  font-weight: var(--semi-bold);
  transition: background-color 100ms linear, color 100ms linear;

  &:hover {
    color: white;
    background: var(--black50);
  }
`

export const SubmenuLink = styled(NavLink)`
  ${submenuItemCommon}

  &.active {
    color: white;
    background: var(--black50);
  }
`

export const SubmenuButton = styled.div`
  ${submenuItemCommon}
`

const mobileNavItemCommon = css`
  ${linkCommon};
  color: var(--gray25);
  font-weight: var(--semi-bold);

  &:hover {
    color: black;
    background: var(--almost-white);
  }
`

export const MobileNavLink = styled(NavLink)`
  ${linkCommon};
  ${mobileNavItemCommon};

  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    :hover > ${SubmenuContainer} {
      display: block;
    }
  }

  &.active {
    color: black;
    font-weight: bold;
    background: var(--almost-white);
  }
`

export const MobileNavItem = styled.div`
  ${mobileNavItemCommon}
`
