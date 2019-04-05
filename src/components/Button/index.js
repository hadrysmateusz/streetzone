import React from "react"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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

	text-shadow: 1px 1px var(--accent50);

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
			border-color: var(--black50);
		}
	}
`

const disabled = css`
	border-color: var(--gray100);
	background: var(--almost-white);
	color: var(--gray50);
`

const Button = styled.button`
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;

	transition-property: background, color, border-color;
	transition-duration: 0.15s;
	transition-timing-function: ease;

	height: 40px;
	min-width: 0;
	padding: 0 0.95rem;
	margin: 0;
	border: 1px solid;

	text-transform: uppercase;
	/* font-weight: 700; */
	letter-spacing: 1px;
	font-size: var(--font-size--xs);

	/* Add spacing between children */
	* + * {
		margin-left: 6px;
	}

	/* Change cursor if button isn't disabled */
	${(p) => (p.disabled ? "cursor: default;" : "cursor: pointer;")}

	/* Variant styles */
	${(p) => (p.accent ? accent : p.primary ? primary : basic)}

	/* Disabled styles */
	${(p) => p.disabled && disabled}

	/* Full-width styling */
	${(p) => p.fullWidth && "width: 100%;"}

	/* Prevent text overflow */
	${ellipsis}
`

const ButtonContainer = styled.div`
	width: 100%;
	display: flex;
	${(p) => !p.noMargin && "margin: var(--spacing2) 0;"}
	${(p) => p.alignRight && "justify-content: flex-end;"}
	${(p) => p.centered && "justify-content: center;"}
	> * + * {
		margin-left: var(--spacing2);
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

const IconButton = styled(IconButtonUnstyled)`
	padding: 0 16px;
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
		margin-right: 8px;
		position: absolute;
		top: 0.2rem;
		left: -1.3rem;
		animation: ${SPIN} 1.3s linear infinite;
	}
`

const FacebookButton = styled(Button)`
	padding-left: 8px;
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
	padding-left: 8px;
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

export default Button
export {
	LoaderButton,
	FacebookButton,
	GoogleButton,
	Button,
	ButtonContainer,
	IconButton,
	UnstyledButton
}
