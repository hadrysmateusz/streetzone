import styled, { css } from "styled-components"

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

	/* box-shadow: 0 3px 6px -2px rgba(0, 0, 0, 0.12); */
	/* transition: transform 0.18s ease;
	&:hover {
		transform: translateY(-3px);
	} */
`

export const Container = styled.div`
	${ContainerCommon}
	height: 345px;
`

export const MiniContainer = styled.div`
	${ContainerCommon}
	height: 240px;
`

export const ThumbnailContainer = styled.div`
	min-height: 0; /* prevent content from overflowing container */
	flex: 1 1 100%;
	max-width: 320px;
	margin: 0 auto;

	img {
		object-fit: contain;
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
	padding: 12px 9px 9px;
	font-size: 0.89rem;
`

export const SecondaryContainer = styled.div`
	border-top: 1px solid ${(p) => p.theme.colors.gray[100]};
	padding: 8px 10px;
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		padding: 10px 12px;
	}
	font-size: 0.85rem;
	display: flex;
	justify-content: space-between;
`

export const InnerContainer = styled.div`
	display: flex;
	justify-content: space-between;
	line-height: 0.89rem;
	margin-bottom: 4px;
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

export const Price = styled(ItemProperty)`
	color: ${(p) => p.theme.colors.accent};
`

export const Designers = styled(ItemProperty)`
	font-weight: bold;
	text-transform: uppercase;
	padding-right: 8px;
	word-spacing: 0.35ch;
`

export const Condition = styled(ItemProperty)`
	color: ${(p) => p.theme.colors.black[100]};
`

export const Size = styled(ItemProperty)``
