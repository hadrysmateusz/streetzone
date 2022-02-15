import styled from "styled-components/macro"

export const DetailsContainer = styled.div`
  display: flex;
  align-content: center;
  margin-bottom: var(--spacing3);
  margin-top: var(--spacing3);

  > * + * {
    margin-left: var(--spacing3);
    @media (min-width: ${(p) => p.theme.breakpoints[4]}px) {
      margin-left: var(--spacing4);
    }
  }
`

export const UsersList = styled.div`
  display: grid;
  gap: var(--spacing3);
  grid-template-columns: 100%;
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

export const Container = styled.div`
  background: white;
  border: 1px solid var(--gray75);
  color: var(--black0);
  padding: var(--spacing3);
  min-height: 238px;
  .top-container {
    display: flex;
    align-items: center;
    .name {
      font-size: var(--fs-l);
      font-weight: bold;
      margin-left: var(--spacing2);
    }
    .follow-button-container {
      margin-left: auto;
      padding: var(--spacing2);
    }
  }
  .info-container {
    margin: var(--spacing3) 0;
  }
  .error {
    color: var(--gray0);
    text-align: center;
    padding: var(--spacing4) 0;
  }
`
