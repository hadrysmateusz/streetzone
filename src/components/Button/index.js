import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { CSS } from "../../constants"

const Button = styled.button`
	/* border: 2px solid;
	border-color: ${(props) => (props.disabled ? CSS.COLOR_DISABLED : CSS.COLOR_BLACK)};
	background: ${(props) => (props.primary ? CSS.COLOR_BLACK : `transparent`)};
	color: ${(props) => (props.primary ? CSS.COLOR_WHITE : CSS.COLOR_BLACK_DARKER)};
	${(props) => props.disabled && `color: ${CSS.COLOR_DISABLED_DARKER}`}
	width: ${(props) => (props.fullWidth ? "100%" : "auto")};
	${(props) => props.fullWidth && "margin: 4px 0;"}
	padding: 0.7rem 1.8rem;
	text-align: center;
	font-size: 0.9rem;
	font-weight: bold;
	display: inline-block;
	line-height: 0.9rem;

	:not(:last-child) {
		margin-right: 8px;
	}

	:not([disabled]) {
		cursor: pointer;
		:hover {
			background: ${CSS.COLOR_BLACK};
			border-color: ${CSS.COLOR_BLACK};
			color: ${CSS.COLOR_WHITE};
		}
	} */

	border: 1px solid ${(props) => (props.primary ? CSS.COLOR_BLACK : "#9f9f9f")};
	/* border-radius: 3px; */
	background: white;
	color: ${(props) => (props.primary ? CSS.COLOR_WHITE : "#555")};
	${(props) => props.disabled && `color: ${CSS.COLOR_DISABLED_DARKER}`}
	width: ${(props) => (props.fullWidth ? "100%" : "auto")};
	${(props) => props.fullWidth && "margin: 4px 0;"}
	padding: 0.78rem 1.8rem;
	text-align: center;
	font-size: 0.9rem;
	/* font-weight: bold; */
	display: inline-block;
	line-height: 0.9rem;

	:not(:last-child) {
		margin-right: 8px;
	}

	:not([disabled]) {
		cursor: pointer;
		:hover {
			background: ${CSS.COLOR_BLACK};
			border-color: ${CSS.COLOR_BLACK};
			color: ${CSS.COLOR_WHITE};
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
		${(props) => !props.isLoading && "display: none"};
		margin-right: 8px;
		position: absolute;
		top: 0.2rem;
		left: -1.3rem;
		animation: ${CSS.KEYFRAMES_SPIN} 1.3s linear infinite;
	}
`

const FacebookButton = styled(Button)`
	color: white;
	background-color: ${(props) => (props.disabled ? "#7D8EB2" : "#3b5998")};
	border-color: ${(props) => (props.disabled ? "#7D8EB2" : "#3b5998")};
	:not([disabled]) {
		:hover {
			background-color: #2b4988;
			border-color: #2b4988;
		}
	}
`

const GoogleButton = styled(Button)`
	color: white;
	background-color: ${(props) => (props.disabled ? "#9FBFF4" : "#4285f4")};
	border-color: ${(props) => (props.disabled ? "#9FBFF4" : "#4285f4")};

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
export { LoaderButton, FacebookButton, GoogleButton, SocialButton }
