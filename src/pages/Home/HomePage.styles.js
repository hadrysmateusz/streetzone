import { Link } from "react-router-dom"
import styled from "styled-components/macro"

export const OuterContainer = styled.div`
  margin-top: calc(-1 * var(--page-header-margin));
  margin-bottom: var(--spacing5);
  @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
    margin-bottom: var(--spacing6);
  }
`

export const StyledLink = styled(Link)`
  color: black;
  font-weight: var(--semi-bold);
  text-decoration: underline;
`
