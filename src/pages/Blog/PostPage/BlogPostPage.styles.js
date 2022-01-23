import styled from "styled-components/macro"

import { ellipsis, getCategoryColor } from "../../../style-utils"
import { PageContainer } from "../../../components/Containers"

export const InnerContainer = styled.div`
  display: grid;
  gap: var(--spacing3);
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    grid-template-columns: 150px 1fr;
  }
  @media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
    grid-template-columns: 170px 1fr;
  }
`

export const Article = styled.article`
  @media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
    font-size: var(--font-size--m);
  }
  max-width: 100%;
  img {
    max-width: 100%;
  }
`

export const InfoAside = styled.aside`
  display: grid;
  gap: var(--spacing2);
  align-content: start;
`

export const OuterContainer = styled.div`
  background: white;
  padding: var(--spacing3) 0;
`

export const HeaderBox = styled.div`
  margin-top: calc(-1 * var(--page-header-margin));
  background: var(--black25);
  color: white;
  padding-top: 20px;
  padding-bottom: var(--spacing5);

  --inner-width: 750px;

  > ${PageContainer} {
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    ${ellipsis}

    .excerpt {
      color: var(--gray100);
      max-width: var(--inner-width);
      overflow: hidden;
      margin-bottom: var(--spacing3);
      white-space: normal;
    }

    .title {
      font-family: var(--ff-serif);
      font-size: var(--fs-l);
      font-weight: bold;
      @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
        font-size: var(--fs-xl);
      }
      margin: var(--spacing1) 0;
      max-width: var(--inner-width);
      white-space: normal;
    }

    .category {
      margin-top: var(--spacing2);
      padding-left: var(--spacing2);
      text-transform: uppercase;
      border-left: 3px solid ${(p) => (p.category ? getCategoryColor(p.category) : "var(--gray50)")};
    }

    .date {
      font-size: var(--font-size--xs);
      color: var(--gray75);
      margin-bottom: var(--spacing4);
    }
  }
`

export const MainImageContainer = styled.div`
  position: relative;
  margin-bottom: var(--spacing3);

  @media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
    margin: calc(-1 * var(--spacing3));
    margin-bottom: var(--spacing3);
  }
`
