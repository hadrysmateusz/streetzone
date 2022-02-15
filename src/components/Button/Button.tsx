import React from "react"
import styled, { css } from "styled-components/macro"

import { ellipsis } from "../../style-utils"

const primary = css`
  border-color: var(--black0);
  background: var(--black0);
  color: white;

  &:not([disabled]) {
    &:hover {
      background: var(--black50);
      border-color: var(--black50);
    }
  }
`

const blackBox = css`
  border-color: white;
  background: var(--black25);
  color: white;

  &:not([disabled]) {
    &:hover {
      background: var(--black75);
      border-color: var(--gray100);
    }
  }
`

const accent = css`
  border-color: var(--accent25);
  background: var(--accent50);
  color: white;

  text-shadow: 1px 1px rgba(0, 0, 0, 0.23), 0 0 5px rgba(0, 0, 0, 0.1);

  :not([disabled]) {
    :hover {
      background: var(--accent25);
      border-color: var(--accent25);
    }
  }
`

const basic = css`
  border-color: var(--gray75);
  background: white;
  color: var(--black0);

  &:not([disabled]) {
    &:hover {
      background: var(--almost-white);
      border-color: var(--gray0);
    }
  }
`

const danger = css`
  border-color: var(--danger0);
  background: white;
  color: var(--danger0);

  &:not([disabled]) {
    &:hover {
      border-color: var(--danger0);
      background: var(--danger0);
      color: white;
    }
  }
`

const messenger = ({ disabled }: { disabled: boolean }) => css`
  color: white;
  ${disabled &&
  css`
    background-color: #00c6ff;
    background-image: linear-gradient(to bottom, #00c6ff, #0078ff);
  `}
  border: none;

  :not([disabled]) {
    :hover {
      background: #00c6ff;
    }
  }
`

const facebook = ({ disabled }: { disabled: boolean }) => css`
  color: white;
  background-color: ${disabled ? "#7D8EB2" : "#3b5998"};
  border-color: ${disabled ? "#7D8EB2" : "#3b5998"};

  :not([disabled]) {
    :hover {
      background-color: #2b4988;
      border-color: #2b4988;
    }
  }
`

const google = ({ disabled }: { disabled: boolean }) => css`
  color: white;
  background-color: ${disabled ? "#9FBFF4" : "#4285f4"};
  border-color: ${disabled ? "#9FBFF4" : "#4285f4"};

  :not([disabled]) {
    :hover {
      background-color: #3275e4;
      border-color: #3275e4;
    }
  }
`

type SocialButtonTypes = "messenger" | "facebook" | "google"
const social = ({
  name,
  ...props
}: {
  disabled: boolean
  name: SocialButtonTypes
}) => {
  switch (name) {
    case "messenger":
      return messenger(props)
    case "facebook":
      return facebook(props)
    case "google":
      return google(props)
    default:
      throw Error("Invalid social button type")
  }
}

const disabled = css`
  border-color: var(--gray100);
  background: var(--almost-white);
  color: var(--gray50);
  font-weight: normal;
`

export type ButtonStylingProps = {
  disabled?: boolean
  fullWidth?: boolean
  big?: boolean
  wide?: boolean

  // TODO: use variant prop instead of multiple booleans
  accent?: boolean
  primary?: boolean
  danger?: boolean
  blackBox?: boolean

  social?: SocialButtonTypes
}

export type ButtonProps = ButtonStylingProps & {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  title?: string
  type?: "button" | "submit" | "reset" | undefined
}

// use type=button by default to prevent accidental form submits
export const Button = styled.button.attrs((props) => ({
  type: props.type ?? "button",
}))<ButtonProps>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  transition-property: background-color, color, border-color, background-image;
  transition-duration: 0.15s;
  transition-timing-function: ease;

  height: ${(p) => (p.big ? "48px" : "40px")};
  min-width: 0;
  padding: 0 ${(p) => (p.wide ? "var(--spacing5)" : "var(--spacing3)")};
  margin: 0;
  border: 1px solid;
  font-weight: var(--semi-bold);

  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: var(--font-size--xs);

  /* Add spacing between children */

  * + * {
    margin-left: var(--spacing2);
  }

  /* Change cursor if button isn't disabled */
  ${(p) =>
    p.disabled
      ? "cursor: default;"
      : "cursor: pointer;"} /* Variant styles */ ${(p) =>
    p.accent
      ? accent
      : p.primary
      ? primary
      : p.danger
      ? danger
      : p.blackBox
      ? blackBox
      : basic} /* Social styles */ ${(p) =>
    p.social &&
    social({
      name: p.social,
      disabled: p.disabled ?? false,
    })} /* Disabled styles */ ${(p) =>
    p.disabled && disabled} /* Full-width styling */ ${(p) =>
    p.fullWidth && "width: 100%;"} /* Prevent text overflow */ ${ellipsis}
`
