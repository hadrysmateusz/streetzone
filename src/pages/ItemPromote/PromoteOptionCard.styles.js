import styled from "styled-components/macro"

export const PromoteOptionCardContainer = styled.div`
  @media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
    order: ${(p) => (p.main ? 1 : 2)};
  }
  display: flex;
  flex-direction: column;
  border: 1px solid var(--gray75);
  height: auto;
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    min-height: ${(p) => (p.main ? "480px" : "390px")};
  }
`

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: var(--spacing3);
  width: 100%;
`

export const ManualLink = styled.div`
  margin-top: var(--spacing3);
  color: var(--gray0);
  text-transform: uppercase;
  font-size: var(--fs-xs);
  text-align: center;
  :hover {
    color: var(--black0);
  }
`

export const Header = styled.div`
  background: ${(p) => (p.main ? "var(--black0)" : "var(--gray75)")};
  color: ${(p) => (p.main ? "white" : "var(--black75)")};
  font-size: var(--fs-m);
  @media (min-width: ${(p) => p.theme.breakpoints[4]}px) {
    font-size: ${(p) => (p.main ? "var(--fs-l)" : "var(--fs-m)")};
  }
  padding: var(--spacing2) 0;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  font-weight: bold;
`

export const ErrorContainer = styled.div`
  margin-top: var(--spacing3);
  color: var(--danger50);
  text-transform: uppercase;
  font-size: var(--fs-xs);
  text-align: center;
`

export const Price = styled.div`
  font-size: var(--fs-xl);
  font-weight: bold;
  color: var(--black50);
  text-align: center;
  margin: var(--spacing3) 0;

  ::after {
    content: "zł";
    color: var(--gray50);
    font-size: var(--fs-l);
    margin-left: var(--spacing2);
  }

  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    font-size: 42px;
  }
`

export const List = styled.div`
  display: grid;
  gap: var(--spacing3);
  margin-bottom: auto;
  align-content: start;
  flex-grow: 1;
`

export const ListItem = styled.div`
  text-align: center;
  color: var(--black0);
  font-size: var(--fs-s);
  @media (min-width: ${(p) => p.theme.breakpoints[4]}px) {
    font-size: var(--fs-m);
  }
`
