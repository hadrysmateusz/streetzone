import React from "react"
import styled, { keyframes } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { CSS } from "../../constants"

const spin = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`

const Button = styled.button`
	border: 2px solid;
	border-color: ${(props) => (props.disabled ? CSS.COLOR_DISABLED : CSS.COLOR_BLACK)};
	background: ${(props) => (props.primary ? CSS.COLOR_BLACK : `transparent`)};
	color: ${(props) => (props.primary ? CSS.COLOR_WHITE : CSS.COLOR_BLACK_DARKER)};
	${(props) => props.disabled && `color: ${CSS.COLOR_DISABLED_DARKER}`}
	width: ${(props) => (props.fullWidth ? "100%" : "auto")};
	padding: 0.6rem 1.8rem;
	text-align: center;
	font-size: 0.9rem;
	font-weight: bold;
	display: inline-block;

	&:not([disabled]) {
		cursor: pointer;
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
		top: 0;
		left: -1.3rem;
		animation: ${spin} 1.3s linear infinite;
	}
`

export default Button
export { LoaderButton }
