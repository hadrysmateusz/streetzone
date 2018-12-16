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

const StyledField = styled(Field)`
	margin-bottom: 15px;
	label {
		display: block;
		font-size: 0.92rem;
		padding-bottom: 5px;
		font-weight: bold;
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
	margin: 0 auto;
`

export { StyledLink, StyledField, Separator, Container }
