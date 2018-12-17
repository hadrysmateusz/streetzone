import { Link } from "react-router-dom"
import { Field } from "react-final-form"
import styled, { css } from "styled-components"

import { CSS } from "../../constants"

// TODO: modify global styles to not overwrite the text-decoration
// and remove the !important
const StyledLink = styled(Link)`
	text-decoration: underline !important;
	:hover {
		color: ${CSS.COLOR_ACCENT};
	}
`
// TODO: replace with StyledInput and FieldLabel
const StyledField = styled(Field)`
	margin-bottom: 15px;
	label {
		font-size: 0.92rem;
		font-weight: bold;
		display: block;
		padding-bottom: 4px;
		margin-left: 1px;
	}
	input {
		padding: 0 8px;
		line-height: 2.1rem;
		width: 100%;
		min-height: 35px; /* ie compatibility */
		:focus {
			outline: none;
			border: 2px solid ${CSS.COLOR_ACCENT};
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
	min-width: 0;
	padding: 0 8px;
	line-height: 2.1rem;
	width: 100%;
	min-height: 35px; /* ie compatibility */
	border: 1px solid #c6c6c6;

	color: ${CSS.COLOR_BLACK_LIGHTER};

	:focus {
		outline: #c6c6c6;
	}

	:focus {
		outline: none;
		border: 2px solid ${CSS.COLOR_ACCENT};
	}

	${(props) => props.type === "number" && StyledInputNumberSpecific}
`

const FieldLabel = styled.div`
	font-size: 0.92rem;
	font-weight: bold;
	display: block;
	padding-bottom: 4px;
	margin-left: 1px;
`

const FieldRow = styled.div`
	margin-bottom: 9px;
`

const SeparatorTextContent = css`
	&::after {
		color: #777;
		content: "${(props) => props.text}";
		background: white;
		padding: 0 4px;
		transform: translateY(-0.6rem)
	}
`

const Separator = styled.p`
	border-top: 1px solid #777;
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

export {
	StyledLink,
	StyledField,
	StyledInput,
	Separator,
	Container,
	FieldLabel,
	FieldRow
}
