import styled from "styled-components/macro"

export const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: 100%;

  gap: var(--spacing3);
  @media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
    margin: 0 calc(var(--spacing3) * -1);
  }
`
