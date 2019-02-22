import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ContainerCommon = css`
	overflow: hidden;
	min-width: 0;
	min-height: 0;
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
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
	font-size: 0.8rem;
	height: 100%;
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		font-size: 0.89rem;
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
	padding: 0 5px;
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		padding: 0 9px;
	}
	border-top: 1px solid ${(p) => p.theme.colors.gray[100]};
`

export const TopContainer = styled.div`
	padding: 12px 0 9px 9px;
	display: flex;
	max-width: 100%;
`

export const SecondaryContainer = styled.div`
	border-top: 1px solid ${(p) => p.theme.colors.gray[100]};
	padding: 8px 9px;
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		padding: 10px 9px;
	}
	font-size: 0.95em;
	display: grid;
	grid-auto-columns: minmax(min-content, 1fr);
	grid-auto-flow: column;
`

export const InnerContainer = styled.div`
	flex: 1;
	min-width: 0;
	line-height: 0.89rem;

	> :first-child {
		margin-bottom: 4px;
	}
`

const ItemProperty = styled.div`
	white-space: nowrap;
	text-overflow: ellipsis;
	font-weight: 500;
	overflow: hidden;
	color: ${(p) => p.theme.colors.black[25]};
`

export const Name = styled(ItemProperty)`
	font-weight: normal;
`

export const Designers = styled(ItemProperty)`
	font-weight: bold;
	text-transform: uppercase;
	padding-right: 8px;
	word-spacing: 0.35ch;
`

export const Price = styled(ItemProperty)`
	color: ${(p) => p.theme.colors.accent};
	text-align: left;
`

export const Condition = styled(ItemProperty)`
	color: ${(p) => p.theme.colors.black[100]};
	text-align: center;
`

export const Size = styled(ItemProperty)`
	text-align: right;
`

export const StyledIcon = styled(FontAwesomeIcon)`
	font-size: 5rem;
	path {
		color: ${(p) => p.theme.colors.gray[100]};
	}
`
