import { Link, NavLink } from "react-router-dom"
import styled, { css } from "styled-components/macro"
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
	color: var(--gray25);
	cursor: pointer;

	text-decoration: none;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 600;

	&:hover {
		color: black;
	}

	&.active {
		color: black;
		text-decoration: underline;
	}

	${(p) => p.alwaysBlack && "color: black;"}
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
	padding-bottom: var(--spacing1);
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
	padding: 0 var(--spacing3);
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
	${(p) => p.top && `top: ${p.top}`};
	${(p) => p.right && `right: ${p.right}`};
	${(p) => p.bottom && `bottom: ${p.bottom}`};
	${(p) => p.left && `left: ${p.left}`};
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
		background: white;
		padding: 0 var(--spacing1);
		position: absolute;
		top: -11px;
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
	padding: var(--spacing4);
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

export const ScrollableContainer = styled.div`
	--x-spacing: ${(p) => p.xSpacing || "var(--spacing3)"};
	--item-width: ${(p) => p.itemWidth || "200px"};
	--gap: ${(p) => p.gap || "var(--spacing2)"};

	display: grid;
	overflow: auto;
	grid-auto-flow: column;
	grid-auto-columns: var(--item-width);
	gap: var(--gap);
	margin: 0 calc(-1 * var(--x-spacing));
	padding: 0 var(--x-spacing);
`

export const Submenu = styled.div`
	background: white;

	white-space: nowrap;

	border: 1px solid var(--gray75);

	display: grid;
	padding: var(--spacing2) 0;
	box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.05);

	> * {
		padding: var(--spacing2) 0;
		width: 100%;
	}
`
