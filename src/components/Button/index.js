import React from "react"
import styled, { css } from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

import { ellipsis, resetButtonStyles } from "../../style-utils"
import { SPIN } from "../../style-utils/keyframes"

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

const messenger = css`
	color: white;
	${(p) =>
		!p.disabled &&
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

const facebook = css`
	color: white;
	background-color: ${(p) => (p.disabled ? "#7D8EB2" : "#3b5998")};
	border-color: ${(p) => (p.disabled ? "#7D8EB2" : "#3b5998")};
	:not([disabled]) {
		:hover {
			background-color: #2b4988;
			border-color: #2b4988;
		}
	}
`

const google = css`
	color: white;
	background-color: ${(p) => (p.disabled ? "#9FBFF4" : "#4285f4")};
	border-color: ${(p) => (p.disabled ? "#9FBFF4" : "#4285f4")};

	:not([disabled]) {
		:hover {
			background-color: #3275e4;
			border-color: #3275e4;
		}
	}
`

const social = (name) => {
	switch (name) {
		case "messenger":
			return messenger
		case "facebook":
			return facebook
		case "google":
			return google
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

const StyledButton = styled.button`
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
	${(p) => (p.accent ? accent : p.primary ? primary : p.danger ? danger : basic)}

	/* Social styles */
	${(p) => p.social && social(p.social)}

	/* Disabled styles */
	${(p) => p.disabled && disabled}
 
	/* Full-width styling */
	${(p) => p.fullWidth && "width: 100%;"}

	/* Prevent text overflow */
	${ellipsis}
`

// make button use type=button by default to prevent accidental form submits
const Button = ({ type = "button", ...props }) => {
	return <StyledButton type={type} {...props} />
}

const ButtonContainer = styled.div`
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

const UnstyledButton = styled.button`
	${resetButtonStyles}
`

const IconButtonUnstyled = ({ icon, ...rest }) => (
	<Button {...rest}>
		<FontAwesomeIcon icon={icon} fixedWidth />
	</Button>
)

// TODO: move from boolean big prop to a size prop
const IconButton = styled(IconButtonUnstyled)`
	padding: 0;
	height: ${(p) => (p.big ? "48px" : "40px")};
	width: ${(p) => (p.big ? "48px" : "40px")};
	flex-shrink: 0;
`

const LoaderButtonUnstyled = ({ isLoading, text, loadingText = text, ...rest }) => (
	<Button {...rest}>
		<span className="contentContainer">
			{isLoading && <FontAwesomeIcon className="spinner" icon={"spinner"} />}
			<span className="text">{isLoading ? loadingText : text}</span>
		</span>
	</Button>
)

const LoaderButton = styled(LoaderButtonUnstyled)`
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

const LinkButton = ({ to, external, ...rest }) => (
	<Button
		as={external ? "a" : Link}
		to={external ? undefined : to}
		href={external ? to : undefined}
		{...rest}
	/>
)

// has to be type button to prevent accidental submits
const BackButton = withRouter(({ history, children = "Wróć" }) => (
	<Button type="button" onClick={() => history.goBack()}>
		{children}
	</Button>
))

export default Button
export {
	LoaderButton,
	Button,
	ButtonContainer,
	IconButton,
	UnstyledButton,
	LinkButton,
	BackButton
}
