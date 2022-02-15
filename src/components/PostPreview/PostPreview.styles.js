import styled from "styled-components/macro"

import { ellipsis, getCategoryColor } from "../../style-utils"

export const TopContainer = styled.div`
  display: flex;
  > * + * {
    margin-left: var(--spacing2);
  }

  font-size: var(--font-size--xs);
  .category {
    text-transform: uppercase;
    font-weight: bold;
    color: ${(p) => getCategoryColor(p.category)};
  }
  .date {
    color: var(--gray0);
  }
`

export const Title = styled.h3`
  margin: 0;
  font: bold var(--font-size--m) / 1.25em var(--font-family--serif);
  @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
    font-size: var(--font-size--l);
  }
`

export const Excerpt = styled.div`
  color: var(--black50);
  max-width: 300px;
`

export const TagsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  text-transform: uppercase;
  font-size: var(--font-size--xs);
  > *:not(:last-child) {
    margin-right: var(--spacing2);
    ${ellipsis}
  }
  color: var(--gray50);
`

export const PostContainer = styled.div`
  min-width: 0; /* prevent overflow */
  > a {
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-template-rows: auto;
    gap: var(--spacing3);
    overflow: hidden;
    padding: var(--spacing3);

    background: var(--almost-white);
    justify-content: start;

    border-bottom: 3px solid ${(p) => getCategoryColor(p.category)};

    @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
      grid-template-columns: 150px 1fr;
    }
    @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
      grid-template-columns: 200px 1fr;
      gap: var(--spacing4);
    }

    transition: background 0.3s linear;

    :hover {
      background: var(--gray125);
    }
  }
`

export const ImageContainer = styled.div`
  max-width: 100%;
  max-height: 100%;

  width: 100%;
  height: 100%;

  cursor: pointer;

  /* display: flex;
	justify-content: center;
	align-items: flex-start; */

  overflow: hidden;
`

export const MainContainer = styled.div`
  display: grid;
  align-content: start;
  padding-top: var(--spacing2);
  gap: var(--spacing1);
  @media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
    gap: var(--spacing2);
  }
`
