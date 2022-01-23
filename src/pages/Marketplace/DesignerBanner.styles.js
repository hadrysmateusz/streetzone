import styled from "styled-components/macro"

export const OuterContainer = styled.div`
  margin-top: calc(-1 * var(--page-header-margin));
  height: 140px;
  background: linear-gradient(135deg, ${(p) => p.colorA}, ${(p) => p.colorB});
  > * {
    height: 100%;
  }
  margin-bottom: var(--spacing3);
`

export const Logo = styled.img`
  height: 100%;
  max-height: 100%;
`

export const InnerContainer = styled.div`
  height: 100%;
  padding: var(--spacing3) 0;
  display: flex;
  > * + * {
    margin-left: var(--spacing3);
  }
  color: white;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.26);
  align-items: center;
`
