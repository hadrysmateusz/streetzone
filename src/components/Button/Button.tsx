import styled, { css } from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

import { ellipsis, resetButtonStyles, SPIN } from "../../style-utils"

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
const social = ({ name, ...props }: { disabled: boolean; name: SocialButtonTypes }) => {
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

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined
  fullWidth?: boolean
  disabled?: boolean
  big?: boolean
  wide?: boolean

  // TODO: use variant prop instead of multiple booleans
  accent?: boolean
  primary?: boolean
  danger?: boolean
  blackBox?: boolean

  social?: SocialButtonTypes
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
  ${(p) => (p.disabled ? "cursor: default;" : "cursor: pointer;")}

  /* Variant styles */
	${(p) =>
    p.accent ? accent : p.primary ? primary : p.danger ? danger : p.blackBox ? blackBox : basic}

	/* Social styles */
	${(p) => p.social && social({ name: p.social, disabled: p.disabled ?? false })}

	/* Disabled styles */
	${(p) => p.disabled && disabled}
 
	/* Full-width styling */
	${(p) => p.fullWidth && "width: 100%;"}

	/* Prevent text overflow */
	${ellipsis}
`

type ButtonContainerProps = {
  vertical?: boolean
  noMargin?: boolean
  alignRight?: boolean
  centered?: boolean
}
export const ButtonContainer = styled.div<ButtonContainerProps>`
  width: 100%;
  display: flex;
  ${(p) => p.vertical && "flex-direction: column;"}
  ${(p) => !p.noMargin && "margin: var(--spacing2) 0;"}
	${(p) => p.alignRight && "justify-content: flex-end;"}
	${(p) => p.centered && "justify-content: center;"}
	> * + * {
    ${(p) => (p.vertical ? "margin-top: var(--spacing2);" : "margin-left: var(--spacing2);")}
  }
`

export const UnstyledButton = styled.button`
  ${resetButtonStyles}
`

type IconButtonProps = { icon: IconProp } & ButtonProps
const IconButtonUnstyled: React.FC<IconButtonProps> = ({ icon, ...rest }) => (
  <Button {...rest}>
    <FontAwesomeIcon icon={icon} fixedWidth />
  </Button>
)

// TODO: move from boolean big prop to a size prop
export const IconButton = styled(IconButtonUnstyled)`
  padding: 0;
  height: ${(p) => (p.big ? "48px" : "40px")};
  width: ${(p) => (p.big ? "48px" : "40px")};
  flex-shrink: 0;
`

type LoaderButtonProps = {
  isLoading: boolean
  text: string
  loadingText?: string
  // onClick?: () => void
} & ButtonProps
const LoaderButtonUnstyled: React.FC<LoaderButtonProps> = ({
  isLoading,
  text,
  loadingText = text,
  ...rest
}) => (
  <Button {...rest}>
    <span className="contentContainer">
      {isLoading && <FontAwesomeIcon className="spinner" icon={"spinner"} />}
      <span className="text">{isLoading ? loadingText : text}</span>
    </span>
  </Button>
)

export const LoaderButton = styled(LoaderButtonUnstyled)`
  .contentContainer {
    position: relative;
    width: auto;
  }
  .spinner {
    margin-right: var(--spacing2);
    position: absolute;
    top: 0.2rem;
    left: -1.3rem;
    animation: ${SPIN} 1.3s linear infinite;
  }
`

type LinkButtonProps = ({ to: string; href?: undefined } | { to?: undefined; href: string }) &
  ButtonProps
export const LinkButton: React.FC<LinkButtonProps> = ({ to, href, ...rest }) => (
  <Button as={href ? "a" : Link} to={to} href={href} {...rest} />
)

// has to be type button to prevent accidental submits
export const BackButton: React.FC = withRouter(
  ({ history, children = "Wróć" }: { history: any; children?: React.ReactNode }) => (
    <Button type="button" onClick={() => history.goBack()}>
      {children}
    </Button>
  )
)
