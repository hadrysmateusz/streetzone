import { withBreakpoints } from "react-breakpoints"
import { NavLink } from "react-router-dom"
import styled, { css } from "styled-components/macro"

import { route } from "../../../utils"

export const TabLink = styled(NavLink)`
  color: var(--gray25);
  font-weight: var(--semi-bold);
  font-size: ${(p) => (p.biggerText ? `var(--fs-s)` : "var(--fs-xs)")};
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
  box-sizing: padding-box;
  border-bottom: 1px solid var(--gray75);
  transition: border-color 0.25s linear, border-width 0.25s linear;

  &:hover {
    color: black;
  }

  ${(p) =>
    p.active &&
    css`
      color: black;
      border-bottom: 3px solid black;
    `}
`

export const TabsNavContainer = styled.nav`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  margin: var(--spacing2) 0;
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    margin: var(--spacing4) 0;
  }
`

const SectionTab = withBreakpoints(({ id, title, active, currentBreakpoint }) => {
  const isMobile = +currentBreakpoint <= 1

  return (
    <TabLink to={route("DROPS_SECTION", { id })} active={active} biggerText={!isMobile}>
      {title}
    </TabLink>
  )
})

const SectionSelect = ({ sections, currentSection }) => (
  <TabsNavContainer>
    {sections.map((section) => (
      <SectionTab key={section.id} active={currentSection.id === section.id} {...section} />
    ))}
  </TabsNavContainer>
)

export default SectionSelect
