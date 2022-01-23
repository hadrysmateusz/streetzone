import styled from "styled-components/macro"

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: var(--fs-m);
  font-weight: bold;
  margin: var(--spacing3) 0;

  @media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
    margin: var(--spacing4) 0;
  }

  .count {
    color: var(--gray0);
    margin-left: var(--spacing2);
  }
`

export const Section = styled.div`
  margin: var(--spacing5) auto;
  max-width: ${(p) => p.theme.breakpoints[1]}px;
`

export const UserSettingsContainer = styled.div`
  max-width: ${(p) => p.theme.breakpoints[5]}px;
`

export const FiltersItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: var(--spacing3);
  overflow: hidden;
  padding: var(--spacing3);
  justify-content: start;

  background: var(--almost-white);
  border: 1px solid var(--gray100);
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.04);

  @media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
    grid-template-columns: 120px 1fr;
  }

  @media (min-width: ${(p) => p.theme.breakpoints[5]}px) {
    grid-template-columns: 200px 1fr;
  }
`

export const ItemsList = styled.div`
  > * + * {
    margin-top: var(--spacing4);
  }
`

export const DropsList = styled.div`
  display: grid;
  gap: var(--spacing3);
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  }
`
