import { Link } from "react-router-dom"
import styled, { css } from "styled-components/macro"

// TODO: modify global styles to not overwrite the text-decoration
// and remove the !important
export const StyledLink = styled(Link)`
  text-decoration: underline !important;
  :hover {
    color: var(--accent50);
  }
`

export const FieldLabel = styled.div`
  display: block;
  color: #3f3f3f;
  padding-bottom: var(--spacing1);
  margin-left: 2px;
  text-transform: uppercase;
  text-align: center;

  letter-spacing: 0.9px;
  font-weight: normal;
`

const SeparatorTextContent = (p: { text: string }) => css`
  &::after {
    color: #888;
    content: "${p.text}";
    background: white;
    padding: 0 var(--spacing1);
    position: absolute;
    top: -11px;
  }
`

interface SeparatorProps {
  text?: string
}

export const Separator = styled.p<SeparatorProps>`
  border-top: 1px solid #ccc;
  position: relative;
  display: flex;
  justify-content: center;
  height: 1rem;
  ${(p) =>
    p.text
      ? css`
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        `
      : css`
          height: 0;
          margin: 0;
        `};
  ${(p) => (p.text ? SeparatorTextContent({ text: p.text }) : undefined)}
`

export const ImportantText = styled.h3`
  text-transform: uppercase;
  font-weight: bold;
  margin: 0;
`

export const Submenu = styled.div`
  background: white;

  white-space: nowrap;

  border: 1px solid var(--gray75);

  display: grid;
  padding: var(--spacing2) 0;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.05);

  > * {
    padding: var(--spacing2) 0;
    width: 100%;
  }
`
