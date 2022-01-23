import { NavLink } from "react-router-dom"
import styled from "styled-components/macro"

export const Nav = styled.nav`
  display: grid;
  gap: var(--spacing3);
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  margin-bottom: var(--spacing3);
`

export const NavItem = styled(NavLink)`
  background: var(--black25);
  :hover {
    background: var(--black75);
  }
  text-align: center;
  color: white;
  padding: var(--spacing3);
  font-weight: var(--semi-bold);
  cursor: pointer;
`
