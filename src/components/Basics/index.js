import { Link, NavLink } from "react-router-dom"
import styled, { css } from "styled-components"
import { gridArea } from "styled-system"

import Textarea from "react-textarea-autosize"

const Header = styled.h2`
	text-align: center;
	color: #2f2f2f;
	font-size: 1.95rem;
	font-weight: normal;
	margin-bottom: 20px;
	margin-top: 0px;
	font-family: "Playfair Display SC", serif;
`

const StyledNavLink = styled(NavLink)`
	font-size: 0.85rem;
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
		color: ${(p) => p.theme.colors.accent};
	}
`

// TODO: modify global styles to not overwrite the text-decoration
// and remove the !important
const StyledLink = styled(Link)`
	text-decoration: underline !important;
	:hover {
		color: ${CSS.COLOR_ACCENT};
	}
`

const StyledFieldCommon = css`
	width: 100%;
	font-size: 1rem;

	border: 1px solid ${(p) => p.theme.colors.gray[50]};
	color: ${CSS.COLOR_BLACK_LIGHTER};

	&::placeholder {
		color: #808080;
	}

	&:not([disabled]) {
		&:focus {
			border: 1px solid ${CSS.COLOR_ACCENT};
			outline: 1px solid ${CSS.COLOR_ACCENT};
		}
		&:not(:focus) {
			&:hover {
				border-color: #adadad;
			}
		}
	}
`

const StyledInputNumberSpecific = css`
	/* only show arrows on hover in firefox */
	&[type="number"] {
		-moz-appearance: textfield;
	}
	&[type="number"]:hover,
	&[type="number"]:focus {
		-moz-appearance: number-input;
	}
`
const StyledInput = styled.input`
	${StyledFieldCommon}
	min-width: 0;
	min-height: 38px; /* ie compatibility */
	padding: 0 10px;
	line-height: 36px;

	${(props) => props.type === "number" && StyledInputNumberSpecific}
`

const StyledTextarea = styled(Textarea)`
	${StyledFieldCommon}
	line-height: 1.45em;
	padding: 6px 10px;
	resize: vertical;
	min-height: calc(4 * 1.45em + 0.7em);
`

const FieldLabel = styled.div`
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
	/* font-size: 0.8rem; */
	font-weight: normal;
`

const FieldRow = styled.div`
	margin-bottom: 10px;
	${gridArea}
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

const Separator = styled.p`
	border-top: 1px solid #ccc;
	position: relative;
	display: flex;
	justify-content: center;
	height: 1rem;
	${(props) =>
		props.text ? `margin-top: 1.5rem; margin-bottom: 0.5rem;` : `height: 0; margin: 0;`};
	${(props) => props.text && SeparatorTextContent}
`

const Container = styled.div`
	display: flex;
	align-items: stretch;
	align-content: stretch;
	flex-direction: column;
	max-width: ${(props) => props.width}px;
	padding: 0 20px;
	margin: 0 auto;
`

const MiniButton = styled.div`
	outline: none;
	opacity: 0.84;
	transition: all 0.2s;
	background: ${(p) => (p.error ? CSS.COLOR_DANGER : CSS.COLOR_BLACK_DARKER)};
	color: ${CSS.COLOR_WHITE};
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
	/* box-shadow: 0 0 3px rgba(0, 0, 0, 0.5); */
	:hover {
		/* background: ${(p) => (p.error ? CSS.COLOR_DANGER_LIGHTER : "black")}; */
		opacity: 1;
	}
`

export {
	StyledLink,
	StyledInput,
	StyledFieldCommon,
	StyledTextarea,
	Separator,
	Container,
	FieldLabel,
	FieldRow,
	MiniButton,
	Header,
	StyledNavLink
}
