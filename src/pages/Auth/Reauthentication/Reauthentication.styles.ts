import styled from "styled-components/macro"

export const StyledForm = styled.form`
  display: grid;
  gap: var(--spacing2);
`

export const ModalOuterContainer = styled.div`
  padding: var(--spacing4);
  max-width: 320px;
`

export const InfoContainer = styled.div`
  text-align: center;
  margin-bottom: var(--spacing3);
  color: var(--gray0);
  font-weight: var(--semi-bold);
  font-style: italic;
`

export const SocialContainer = styled.div`
  display: grid;
  gap: var(--spacing2);
  margin: calc(var(--spacing3) - 5px) 0;
`

export const EmailContainer = styled.div`
  margin-top: calc(var(--spacing3) - 12px);
  margin-bottom: var(--spacing3);
`
