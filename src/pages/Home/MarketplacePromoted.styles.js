import styled from "styled-components/macro"

import { ellipsis, nLinesHigh } from "../../style-utils"

export const OuterContainer = styled.div`
  margin-top: var(--spacing5);
  @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
    margin-top: var(--spacing6);
  }
`

export const InnerContainer = styled.div`
  display: grid;
  gap: var(--spacing3);
  @media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing4);
  }
`

export const PromotedItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(140px, 0.5fr);
  @media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
    grid-template-columns: 1fr minmax(140px, 0.8fr);
  }
  gap: var(--spacing3);
`

export const InfoContainer = styled.div`
  padding: var(--spacing3) 0;
`

export const Designers = styled.div`
  font-size: var(--font-size--s);
  color: var(--gray0);
  text-transform: uppercase;
  margin-bottom: var(--spacing3);

  ${ellipsis}
`

export const Name = styled.div`
  font-size: var(--font-size--l);
  font-weight: var(--semi-bold);
  ${nLinesHigh(2, { lineHeight: 1.3 })}
  margin-bottom: var(--spacing3);
  text-overflow: ellipsis;
`
