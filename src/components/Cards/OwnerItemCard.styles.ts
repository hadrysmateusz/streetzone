import styled from "styled-components/macro"
import { Link } from "react-router-dom"

import { nLinesHigh } from "../../style-utils"

import { cardBorder } from "./Common.styles"

export const OuterContainer = styled.div`
  min-width: 0;
  max-width: 100%;
  width: 100%;
  min-height: 0;
  background: white;

  ${cardBorder}
  overflow: hidden;
  display: grid;

  @media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
    &,
    :hover {
      border-left: none;
      border-right: none;
      margin-right: -4px;
      margin-left: -4px;
    }
  }
  @media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
    > * {
      min-height: 0;
    }
  }
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    grid-template-columns: 210px 10fr 10fr;
    grid-template-rows: 248px;
  }
  @media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
    grid-template-columns: 210px 10fr 7fr;
  }
`

export const OuterDetailsContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  .mobile-image-container {
    height: 200px;
    width: 156px;

    margin-top: var(--spacing3);
    margin-right: var(--spacing3);
    margin-bottom: var(--spacing3);
  }
`

export const DetailsContainer = styled.div`
  display: flex;
  align-content: center;
  margin: var(--spacing2) 0;

  @media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
    flex-direction: column;
  }

  > * + * {
    @media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
      margin-top: var(--spacing2);
    }
    @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
      margin-left: var(--spacing4);
    }
  }
`

export const InfoContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(4, min-content) minmax(0, 1fr);
  grid-template-columns: 100%;
  min-height: 0;
  min-width: 0;
  height: 100%;
  padding: var(--spacing2);
  @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
    padding: var(--spacing3);
  }
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    padding-right: 0;
  }
  @media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
    padding-right: var(--spacing3);
  }
`

export const Name = styled.div`
  color: var(--black0);
  font-size: var(--font-size--l);
  font-family: var(--font-family--serif);
  font-weight: bold;
  height: 100%;
  ${nLinesHigh(2, { useMaxHeight: true, lineHeight: 1.5 })}
`

export const ActionsContainer = styled.div`
  padding: var(--spacing2);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
    padding: var(--spacing3);
  }
`

export const StatusContainer = styled.div`
  font-size: var(--fs-xs);
  color: var(--black25);
  padding: var(--spacing2) 0;
  display: flex;
  align-content: center;
  justify-content: center;

  > * + * {
    margin-left: var(--spacing3);
  }
`

export const DescriptionContainer = styled.div`
  min-height: 0;
  overflow: auto;
`

export const StyledLearnMoreLink = styled(Link)`
  font-size: var(--fs-xs);
  text-decoration: underline;
  color: var(--gray0);
  text-align: center;
  width: 100%;
  display: block;
  padding-bottom: var(--spacing3); /* necessary on mobile */
`
