import styled from "styled-components/macro"

export const OuterContainer = styled.div`
  position: relative;
`

export const Layout = styled.div`
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    display: grid;
    grid-template-columns: 1fr minmax(220px, 25%);
    gap: var(--spacing3);
  }
`

export const TopContainer = styled.div`
  position: fixed;
  top: var(--page-header-height);
  box-shadow: 0 10px 10px -6px rgba(0, 0, 0, 0.08);
  width: 100%;
  /* TODO: make this higher than pageheader after making submenus use portals */
  z-index: 79;
  border-bottom: 1px solid var(--gray75);
  padding: var(--spacing3) 0;
  margin-bottom: var(--spacing3);
  background: white;
`

export const ContentContainer = styled.div`
  margin-top: 150px;
`

export const Section = styled.div`
  :not(:last-child) {
    margin-bottom: var(--spacing4);
  }
`
