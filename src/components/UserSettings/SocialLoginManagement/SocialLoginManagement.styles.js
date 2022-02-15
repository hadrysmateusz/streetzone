import styled from "styled-components/macro"

export const SocialContainer = styled.div`
  display: grid;
  gap: var(--spacing3);
`

export const SocialCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--spacing3);
`
