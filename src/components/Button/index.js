import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { SPIN } from "../../style-utils/keyframes"

const Button = styled.button`
	border: 1px solid;
	border-color: ${(p) => (p.disabled ? "#d7d7d7" : "#c6c6c6")};
	background: ${(p) => (p.primary ? "#282828" : `white`)};
	color: ${(p) => (p.primary ? "white" : "#3e3e3e")};
	${(p) => p.disabled && `color: #c3c3c3;`}
	width: ${(p) => (p.fullWidth ? "100%" : "auto")};
	${(p) => p.fullWidth && "margin: 4px 0;"}
	padding: 0.8rem 1.85rem;
	text-align: center;
	font-size: 0.79rem;
	display: inline-block;
	font-weight: 500;
	${(p) => p.disabled && `font-weight: normal;`}
	line-height: 0.79rem;

	/* :not(:last-child) {
		margin-right: 8px;
	} */

	:not([disabled]) {
		cursor: pointer;
		:hover {
			background: "#282828";
			border-color: "#282828";
			color: "white";
		}		
		:focus {
			border: 1px solid ${(p) => p.theme.colors.accent};
			outline: none;

		}
	}
	margin: 0;
`

const AccentButton = styled(Button)`
	text-shadow: 1px 1px ${(p) => p.theme.colors.accent};
	border-color: ${(p) => (p.disabled ? p.theme.colors.gray[50] : p.theme.colors.accent)};
	background: ${(p) => (p.disabled ? p.theme.colors.gray[50] : p.theme.colors.accent)};
	color: "white";
	${(p) => p.disabled && `color: ${p.theme.colors.danger[0]}`}
	font-weight: bold;

	:not([disabled]) {
		:hover {
			background: rgb(76, 220, 184);
			border-color: ${(p) => p.theme.colors.accent};
			color: "white";
		}
	}
`

const LoaderButtonUnstyled = ({ isLoading, text, loadingText = text, ...rest }) => (
	<Button {...rest}>
		<span className="contentContainer">
			<FontAwesomeIcon className="spinner" icon="spinner" />
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
		${(p) => !p.isLoading && "display: none"};
		margin-right: 8px;
		position: absolute;
		top: 0.2rem;
		left: -1.3rem;
		animation: ${SPIN} 1.3s linear infinite;
	}
`

const FacebookButton = styled(Button)`
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

const GoogleButton = styled(Button)`
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

const SocialButton = ({ provider, ...rest }) => {
	switch (provider) {
		case "google.com":
			return <GoogleButton {...rest} />
		case "facebook.com":
			return <FacebookButton {...rest} />
		default:
			return <Button {...rest} />
	}
}

export default Button
export { LoaderButton, FacebookButton, GoogleButton, SocialButton, AccentButton }
