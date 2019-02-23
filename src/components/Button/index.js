import React from "react"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { ellipsis } from "../../style-utils"
import { SPIN } from "../../style-utils/keyframes"

const primary = css`
	border-color: ${(p) => p.theme.colors.black[0]};
	background: ${(p) => p.theme.colors.black[0]};
	color: white;

	&:not([disabled]) {
		&:hover {
			background: ${(p) => p.theme.colors.black[50]};
			border-color: ${(p) => p.theme.colors.black[50]};
		}
	}
`

const accent = css`
	border-color: ${(p) => p.theme.colors.accent};
	background: ${(p) => p.theme.colors.accent};
	color: white;

	text-shadow: 1px 1px ${(p) => p.theme.colors.accent};

	:not([disabled]) {
		:hover {
			background: rgb(76, 220, 184);
			border-color: ${(p) => p.theme.colors.accent};
		}
	}
`

const basic = css`
	border-color: ${(p) => p.theme.colors.gray[75]};
	background: white;
	color: ${(p) => p.theme.colors.black[0]};

	&:not([disabled]) {
		&:hover {
			background: #fdfdfd;
			border-color: ${(p) => p.theme.colors.black[50]};
		}
	}
`

const disabled = css`
	border-color: ${(p) => p.theme.colors.gray[100]};
	background: transparent;
	color: ${(p) => p.theme.colors.gray[50]};
`

const Button = styled.button`
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;

	height: 46px;
	min-width: 0;
	padding: 0 0.95rem;
	margin: 0;
	border: 2px solid;
	border-radius: 2px;

	text-transform: uppercase;
	font-weight: 700;
	font-size: 0.8rem;

	/* Add spacing between children */
	* + * {
		margin-left: 6px;
	}

	/* Change cursor if button isn't disabled */
	&:not([disabled]) {
		cursor: pointer;
	}

	/* Prevent text overflow */
	${ellipsis}

	/* Variant styles */
	${(p) => (p.accent ? accent : p.primary ? primary : basic)}

	/* Disabled styles */
	${(p) => p.disabled && disabled}

	/* Full-width styling */
	${(p) => p.fullWidth && "width: 100%;"}
`

export const ButtonContainer = styled.div`
	width: 100%;
	display: flex;
	margin: 10px 0;
	${(p) => p.alignRight && "justify-content: flex-end;"}
	${(p) => p.centered && "justify-content: center;"}
	* + * {
		margin-left: 10px;
	}
`

const IconButtonUnstyled = ({ icon, ...rest }) => (
	<Button {...rest}>
		<FontAwesomeIcon icon={icon} />
	</Button>
)

export const IconButton = styled(IconButtonUnstyled)`
	height: 34px;
	width: 34px;
	${(p) => p.small && "height: 30px; width: 30px; font-size: 13px;"}
	${(p) => p.large && "height: 40px; width: 40px;"}
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
