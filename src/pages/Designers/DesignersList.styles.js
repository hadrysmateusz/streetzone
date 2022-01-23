import styled from "styled-components/macro"
import { Link } from "react-router-dom"

import { ellipsis } from "../../style-utils"

export const OuterContainer = styled.div`
  max-width: 100%;
`

export const SectionContainer = styled.div`
  margin: var(--spacing4) 0;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: var(--spacing2);
`

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

  > * {
    ${ellipsis}
  }
  grid-auto-rows: min-content;
  gap: var(--spacing2);
  align-content: center;
`

export const ListContainer = styled.div`
  margin: var(--spacing4) auto 0;
  max-width: 700px;
`

export const LetterNavbarContainer = styled.div`
  overflow: auto;
  border-bottom: 1px solid var(--gray75);
  margin-top: var(--spacing4);

  /* make the content go from edge to edge on mobile*/
  @media (max-width: ${(p) => p.theme.breakpoints[3] - 1}px) {
    --x-margin: calc(-1 * var(--spacing3));
    margin-left: var(--x-margin);
    margin-right: var(--x-margin);
    padding: 0 var(--spacing3);
    &::after {
      content: "";
      display: block;
      width: var(--spacing2);
    }
  }
`

export const LetterNavbar = styled.div`
  overflow: visible;

  padding-bottom: var(--spacing2);
  display: flex;
  justify-content: space-around;
  min-width: 850px;
  width: 100%;
`

export const NavLetterContainer = styled.div`
  cursor: ${(p) => (p.isEmpty ? "default" : "pointer")};
  color: var(--black75);
  user-select: none;
  ${(p) => p.isEmpty && "color: var(--gray25);"}
  font-family: var(--font-family--serif);
  font-size: var(--font-size--l);
  font-weight: var(--semi-bold);
`

export const StyledLink = styled(Link)`
  cursor: pointer;
  color: var(--gray0);
  text-transform: uppercase;
  :hover {
    color: var(--black0);
  }
`

export const SectionLetter = styled.div`
  font-size: 6.4rem;
  font-weight: bold;
  color: var(--black75);
`
