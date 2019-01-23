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
	position: relative;
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
	padding: 12px 0 9px 9px;
	font-size: 0.89rem;
	display: flex;
	max-width: 100%;
`

export const SecondaryContainer = styled.div`
	border-top: 1px solid ${(p) => p.theme.colors.gray[100]};
	padding: 8px 9px;
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		padding: 10px 9px;
	}
	font-size: 0.85rem;
	display: flex;
	justify-content: space-between;
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
`

export const Condition = styled(ItemProperty)`
	color: ${(p) => p.theme.colors.black[100]};
`

export const Size = styled(ItemProperty)``
