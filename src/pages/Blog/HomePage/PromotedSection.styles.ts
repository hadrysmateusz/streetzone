import styled from "styled-components/macro"

export const DesktopContainer = styled.div`
  margin-bottom: var(--spacing3);
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: var(--spacing3);
  height: 440px;
  > *:first-child {
    grid-row: span 2;
  }
`

export const MobileContainer = styled.div`
  background: var(--almost-white);
  height: 32vh;
  margin-top: calc(-1 * var(--page-header-margin));
  margin-bottom: var(--spacing3);
`
