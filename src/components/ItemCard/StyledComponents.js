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

export const HorizontalContainer = styled.div`
	transition: box-shadow 200ms ease;
	:hover {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.11);
	}
	a {
		border: 1px solid var(--gray75);
		display: grid;
		grid-template-rows: 100%;
		grid-template-columns: 3fr 1fr;

		.info-container {
			padding: var(--spacing4);

			.top-container {
				display: flex;
				font-size: var(--font-size--xs);
				color: var(--gray0);
				text-transform: uppercase;
				margin-bottom: var(--spacing1);

				.designers {
					font-weight: bold;
					margin-left: var(--spacing3)
				}
			}

			.name {
				font-size: var(--font-size--l);
				font-family: var(--font-family--serif);
				font-weight: bold;
				color: var(--black0);
			}

			.createdAt {
				font-size: var(--font-size--xs);
				color: var(--gray0);
				margin: var(--spacing2) 0;
			}

			.description {
				max-width: 460px;
				color: var(--black50);
			}

			.bottom-container {
				display: flex;
				justify-content: space-between;
				margin-top: var(--spacing3);

				.price {
					color: var(--error0);
					font-size: var(--font-size--m);
					font-weight: bold;
				}

				.like-button {
					color: var(--gray25);
				}
			}
		}
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
