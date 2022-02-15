import styled from "styled-components/macro"

export const NavContainer = styled.div`
  margin: ${(p) => (p.noMargin ? "0" : "var(--spacing3)")} 0;
  text-transform: uppercase;
  font-size: var(--font-size--xs);
  color: ${(p) => (p.white ? "white" : "var(--gray0)")};
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  .left {
    text-align: left;
    min-width: 0;
  }
  .right {
    font-weight: var(--semi-bold);
    > :first-child {
      margin-right: var(--spacing1);
    }
  }
`

export const IconContainer = styled.div`
  margin: 0 var(--spacing2);

  font-weight: bold;
  display: inline;
`
