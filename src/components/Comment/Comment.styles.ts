import styled from "styled-components/macro"

export const CommentContainer = styled.div`
  display: grid;
  gap: var(--spacing1);
  margin-bottom: var(--spacing4);
  /* background: var(--almost-white); */
  padding: 0 var(--spacing3) var(--spacing4);
  /* background: white;
	border: 1px solid var(--gray75); */
  /* box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.04); */
  :not(:last-child) {
    border-bottom: 1px solid var(--gray100);
  }
`

export const Header = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr min-content;
  align-items: center;
`

export const SubmenuItem = styled.div`
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-size: var(--fs-xs);
  font-weight: var(--semi-bold);
  color: var(--black100);
  cursor: pointer;
  padding: var(--spacing2) var(--spacing3);

  :hover {
    background: var(--almost-white);
    color: black;
  }
`
