import { Link, NavLink } from "react-router-dom"
import styled, { css } from "styled-components"
import { gridArea } from "styled-system"
import Textarea from "react-textarea-autosize"

export const resetButtonStyles = css`
	background: none;
	border: none;
	box-shadow: none;
	display: block;
	border-radius: 0;
	outline: none;
	cursor: pointer;
`

export const More = styled.button`
	${resetButtonStyles}
	font-size: 0.81rem;
	font-weight: bold;
	color: ${(p) => p.theme.colors.black[50]};
	margin: 3px 0;
`

export const Header = styled.h2`
	text-align: center;
	color: #2f2f2f;
	font-size: 1.95rem;
	font-weight: normal;
	margin-bottom: 20px;
	margin-top: 0px;
	font-family: "Playfair Display SC", serif;
`

export const StyledNavLink = styled(NavLink)`
	display: flex;
	align-items: center;
	background: none;
	border: none;
	outline: none;
	padding: 0;
	color: ${(p) => p.theme.colors.black[75]};
	cursor: pointer;
	text-transform: uppercase;

	&:hover {
		color: black;
	}

	&.active {
		font-weight: 600;
	}
`

// TODO: modify global styles to not overwrite the text-decoration
// and remove the !important
export const StyledLink = styled(Link)`
	text-decoration: underline !important;
	:hover {
		color: ${(p) => p.theme.colors.accent};
	}
`

export const StyledFieldCommon = css`
	width: 100%;
	font-size: 1rem;

	border: 1px solid ${(p) => p.theme.colors.gray[50]};
	color: ${(p) => p.theme.colors.black[50]};

	&::placeholder {
		color: #808080;
	}

	&:not([disabled]) {
		&:focus {
			border: 1px solid ${(p) => p.theme.colors.accent};
			outline: 1px solid ${(p) => p.theme.colors.accent};
		}
		&:not(:focus) {
			&:hover {
				border-color: #adadad;
			}
		}
	}
`

export const StyledInputNumberSpecific = css`
	/* only show arrows on hover in firefox */
	&[type="number"] {
		-moz-appearance: textfield;
	}
	&[type="number"]:hover,
	&[type="number"]:focus {
		-moz-appearance: number-input;
	}
`
export const StyledInput = styled.input`
	${StyledFieldCommon}
	min-width: 0;
	min-height: 38px; /* ie compatibility */
	padding: 0 10px;
	line-height: 36px;

	${(props) => props.type === "number" && StyledInputNumberSpecific}
`

export const StyledTextarea = styled(Textarea)`
	${StyledFieldCommon}
	line-height: 1.45em;
	padding: 6px 10px;
	resize: vertical;
	min-height: calc(4 * 1.45em + 0.7em);
`

export const FieldLabel = styled.div`
	font-size: 0.75rem;
	font-weight: bold;
	display: block;
	color: #3f3f3f;
	padding-bottom: 5px;
	margin-left: 2px;
	text-transform: uppercase;
	text-align: center;

	text-transform: uppercase;
	letter-spacing: 0.9px;
	font-weight: normal;
`

export const FieldRow = styled.div`
	/* margin-bottom: 10px; */
	${gridArea}
`

export const Container = styled.div`
	display: flex;
	align-items: stretch;
	align-content: stretch;
	flex-direction: column;
	max-width: ${(props) => props.width}px;
	padding: 0 20px;
	margin: 0 auto;
`

export const MiniButton = styled.div`
	outline: none;
	opacity: 0.84;
	transition: all 0.2s;
	background: ${(p) => (p.error ? p.theme.colors.danger[50] : p.theme.colors.black[25])};
	color: white;
	font-size: 15px;
	width: ${(p) => p.size}px;
	height: ${(p) => p.size}px;
	${(p) => p.position.top && `top: ${p.position.top}`};
	${(p) => p.position.right && `right: ${p.position.right}`};
	${(p) => p.position.bottom && `bottom: ${p.position.bottom}`};
	${(p) => p.position.left && `left: ${p.position.left}`};
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 12px;
	border-radius: 50%;
	position: absolute;
	:hover {
		opacity: 1;
	}
	cursor: ${(p) => (p.error ? "default" : "pointer")};
`

const SeparatorTextContent = css`
	&::after {
		color: #888;
		content: "${(props) => props.text}";
		background: #fbfbfb;
		padding: 0 4px;
		transform: translateY(-0.6rem)
	}
`

export const Separator = styled.p`
	border-top: 1px solid #ccc;
	position: relative;
	display: flex;
	justify-content: center;
	height: 1rem;
	${(props) =>
		props.text ? `margin-top: 1.5rem; margin-bottom: 0.5rem;` : `height: 0; margin: 0;`};
	${(props) => props.text && SeparatorTextContent}
`

export const SubHeader = styled.h3`
	text-transform: uppercase;
	font-size: 0.85rem;
	text-align: center;
	margin: 15px 0;
	font-weight: 300;
`

export const ImportantText = styled.h3`
	text-transform: uppercase;
	font-size: 1rem;
	font-weight: bold;
	margin: 0;
`

export const InfoBlock = styled.div`
	background: #f2f2f2;
	margin: 60px 0;
	padding: 30px;
	text-align: center;
	display: flex;
	align-items: center;
	flex-direction: column;

	h3 {
		margin: 0;
		font-size: 1rem;
	}

	p {
		max-width: 550px;
	}
`
