import styled, { css } from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Text, TextBlock } from "../StyledComponents"

const ContainerCommon = css`
	overflow: hidden;
	min-width: 0;
	min-height: 0;
	background: white;

	a {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
`

export const Container = styled.div`
	${ContainerCommon}
	position: relative;
	height: 100%;
	transition: box-shadow 200ms ease;
	:hover {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.11);
	}
`

export const MiniContainer = styled.div`
	${ContainerCommon}
	height: 240px;
`

export const ThumbnailContainer = styled.div`
	min-height: 0; /* prevent content from overflowing container */
	flex: 1 1 100%;
	max-width: 320px;
	overflow: hidden;
	justify-content: center;
	align-items: center;
	display: flex;

	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
`

export const InfoContainer = styled.div`
	border-top: 1px solid ${(p) => p.theme.colors.gray[100]};
	padding: 4px;
`

export const TopContainer = styled.div`
	padding: 15px 2px 12px 12px;
	display: flex;
	max-width: 100%;
`

export const SecondaryContainer = styled.div`
	border-top: 1px solid ${(p) => p.theme.colors.gray[100]};
	padding: 12px;

	display: grid;
	grid-auto-columns: minmax(min-content, 1fr);
	grid-auto-flow: column;
`

export const InnerContainer = styled.div`
	flex: 1;
	min-width: 0;

	> :first-child {
		margin-bottom: var(--spacing1);
	}
`

const itemBase = css`
	white-space: nowrap;
	text-overflow: ellipsis;
	font-weight: 500;
	overflow: hidden;
	line-height: 1.2;
	color: black;
`

export const Name = styled(TextBlock)`
	${itemBase}
`

export const Designers = styled(TextBlock)`
	${itemBase}
	font-weight: bold;
	text-transform: uppercase;
	padding-right: var(--spacing2);
	word-spacing: 0.12ch;
`

export const Price = styled(Text)`
	${itemBase}
	font-weight: bold;
	text-align: left;
`

export const Size = styled(Text)`
	${itemBase}
	font-weight: bold;
	text-align: right;
`

export const StyledIcon = styled(FontAwesomeIcon)`
	font-size: 5rem;
	path {
		color: ${(p) => p.theme.colors.gray[100]};
	}
`
