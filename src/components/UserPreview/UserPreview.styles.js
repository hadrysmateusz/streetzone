import styled from "styled-components/macro"

export const Container = styled.div`
  background: ${(p) => !p.onlyInfo && "var(--almost-white)"};
  padding: ${(p) => !p.onlyInfo && "var(--spacing3)"};
  color: var(--black75);
  .top-container {
    display: flex;
    align-items: center;
    .name {
      font-size: var(--fs-l);
      font-weight: bold;
      margin-left: var(--spacing2);
    }
  }
  .info-container {
    margin-top: var(--spacing3);
  }
  .error {
    color: var(--gray0);
    text-align: center;
    padding: var(--spacing4) 0;
  }
`

export const InfoItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  .value {
    font-weight: bold;
  }
`

export const ButtonContainer = styled.div`
  margin-top: var(--spacing3);
`
