import { Link, NavLink } from "react-router-dom"
import styled, { css } from "styled-components"
import { gridArea } from "styled-system"

export const Header = styled.h2`
	text-align: center;
	color: #2f2f2f;
	font-weight: normal;
	margin-bottom: 20px;
	margin-top: 0px;
	font-family: "Playfair Display SC", serif;
`

export const StyledNavLink = styled(NavLink)`
	display: flex;
	align-items: center;
	background: none;
	padding: 0;
	color: var(--gray0);
	cursor: pointer;

	text-decoration: none;

	&:hover {
		color: black;
	}

	&.active {
		color: black;
		text-decoration: underline;
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

export const FieldLabel = styled.div`
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
	text-align: center;
	margin: 15px 0;
	font-weight: 300;
`

export const ImportantText = styled.h3`
	text-transform: uppercase;
	font-weight: bold;
	margin: 0;
`

export const InfoBlock = styled.div`
	background: #f2f2f2;
	margin: 110px 0;
	padding: 30px;
	text-align: center;
	display: flex;
	align-items: center;
	flex-direction: column;

	h3 {
		margin: 0;
	}

	p {
		max-width: 550px;
	}
`
