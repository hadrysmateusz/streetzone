import styled from "styled-components/macro"

export const SocialContainer = styled.div`
  display: grid;
  gap: var(--spacing2);
  margin-bottom: calc(var(--spacing3) - 5px);
`

export const EmailContainer = styled.div`
  margin-top: calc(var(--spacing3) - 12px);
  margin-bottom: var(--spacing3);
`

export const BannerContainer = styled.div`
  text-align: center;
  background: var(--black0);
  color: white;
  padding: var(--spacing4) var(--spacing3);
  @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
    padding: var(--spacing5) var(--spacing3);
  }
  margin-top: calc(-1 * var(--page-header-margin));
`

export const BannerMessage = styled.div`
  font-size: var(--fs-m);
  @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
    font-size: var(--fs-l);
  }
  font-weight: var(--semi-bold);
  text-shadow: 1px 1px #444;
`
