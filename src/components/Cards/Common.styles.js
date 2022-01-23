import styled, { css } from "styled-components/macro"

import { ellipsis, getCategoryColor } from "../../style-utils"

export const cardBorder = css`
  border: 1px solid var(--gray75);
  transition: border-color 200ms ease;
  :hover {
    border: 1px solid var(--gray25);
  }
`

export const InfoContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-columns: 100%;
  min-height: 0;
  min-width: 0;
  height: 100%;
  padding: var(--spacing2);
  @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
    padding: var(--spacing3);
  }
`

export const BottomContainer = styled.div`
  display: flex;

  ${(p) => p.pinToBottom && "align-self: end;"}

  .align-right {
    margin-left: auto;
  }
`

const middleContainerFlex = css`
  display: flex;
  align-items: center;
  .align-right {
    margin-left: auto;
  }
`

export const MiddleContainer = styled.div`
  padding-top: var(--spacing1);
  padding-bottom: var(--spacing2);

  ${(p) => p.flex && middleContainerFlex}
`

export const TopContainer = styled.div`
  display: flex;
  font-size: var(--font-size--xs);
  color: var(--gray0);
  text-transform: uppercase;

  /* prevent children from taking up more space than they need */
  > * {
    ${ellipsis}
    flex: 0 1 auto;
  }

  /* add spacing between children */
  > * + * {
    padding-left: var(--spacing2);
    @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
      padding-left: var(--spacing3);
    }
  }
`

export const Name = styled.div`
  --line-height: 1.5em;

  color: var(--black0);
  font-size: ${(p) => p.big && "var(--font-size--l)"};
  font-family: var(--font-family--serif);
  font-weight: bold;
  line-height: var(--line-height);
  height: calc(2 * var(--line-height));
  overflow: hidden;
`

export const DateContainer = styled.div`
  ${(p) => p.withMargin && "margin: var(--spacing2) 0;"}
  font-size: var(--font-size--xs);
  color: var(--gray0);
`

export const PostCategory = styled.div`
  font-size: var(--font-size--xs);
  color: var(--gray0);
  font-weight: bold;
  text-transform: uppercase;

  border-left: 3px solid ${(p) => getCategoryColor(p.category)};
  padding-left: var(--spacing2);
  line-height: 1.4;
`

export const DesignersContainer = styled.div`
  font-weight: bold;
`

export const SizeContainer = styled.div`
  margin-left: auto;
  color: var(--black0);
  font-weight: bold;
  flex-shrink: 0;
`

export const PriceContainer = styled.div`
  color: var(--danger0);
  font-weight: bold;
  flex-shrink: 0;
`

export const BigCardContainer = styled.div`
  min-width: 0; /* this has to be on the outermost component*/
  max-width: 580px;
  width: 100%;
  background: white;
  /* box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1); */

  > a {
    ${cardBorder}
    overflow: hidden;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 180px min-content;
    @media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
      grid-template-rows: 200px min-content;
    }
    @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
      grid-template-rows: 270px min-content;
    }
  }
`

export const BigCardTitle = styled.div`
  --line-height: 1.5em;

  color: var(--black0);
  font-size: var(--fs-s);
  font-family: var(--font-family--serif);
  font-weight: bold;
  line-height: var(--line-height);
  height: calc(2 * var(--line-height));
  overflow: hidden;
  @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
    font-size: var(--fs-m);
  }
`

export const SmallCardContainer = styled.div`
  min-width: 0; /* this has to be on the outermost component*/
  max-width: 310px;
  width: 100%;
  background: white;

  > a {
    ${cardBorder}
    overflow: hidden;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 140px min-content;
    @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
      grid-template-rows: 165px min-content;
    }
  }
`
