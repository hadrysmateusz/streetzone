import styled from "styled-components/macro"

export const MainGrid = styled.div`
  position: relative;
  @media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
    display: grid;
    grid-template-columns: 270px 1fr;
    gap: var(--spacing3);
  }
`

export const Sidebar = styled.aside`
  align-self: flex-start;

  /* mobile */
  @media (max-width: ${(p) => p.theme.breakpoints[3] - 1}px) {
    width: 0;
    margin: 0;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
  }
`

export const SidebarInner = styled.div`
  border: 1px solid var(--gray75);
  background: white;
`

export const GridContainer = styled.div`
  display: grid;
  gap: var(--spacing3);
`

export const FiltersHeader = styled.div`
  text-align: center;
  padding: var(--spacing2);
  font-size: var(--fs-l);
  font-weight: bold;
  border-bottom: 1px solid var(--gray75);
`

export const StartSellingBox = styled.div`
  background: var(--black25);
  color: var(--gray75);
  font-size: var(--fs-s);
  padding: 16px;
  margin-top: 16px;

  .ssb-heading {
    text-transform: uppercase;
    color: white;
    margin-bottom: 6px;
    font-weight: 700;
  }

  .ssb-body {
    margin-bottom: 14px;
  }
`
