import styled, { css } from "styled-components/macro"
import { overlayTextShadow, getCategoryColor } from "../../../style-utils"

const promotedCommon = css`
	width: 100%;
	height: 100%;
	background-size: cover;
	background-position: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
`

export const PromotedPostMobileContainer = styled.div`
	background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0) 42%,
			rgba(0, 0, 0, 0.25) 62%,
			rgba(0, 0, 0, 0.8) 100%
		),
		url(${(p) => p.image}), var(--gray100);
	color: white;
	padding: var(--spacing3) 0;
	overflow-y: hidden;
	text-align: center;

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		:hover {
			.info-container {
				transform: none;
			}
		}
	}

	.info-container {
		transition: transform 200ms ease;
		transform: translateY(var(--spacing4));
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
	}

	.additional-info {
		margin-top: var(--spacing3);
	}

	.title {
		font-family: var(--font-family--serif);
		font-size: var(--font-size--m);
		font-weight: bold;
		max-width: 75vw;
		padding: var(--spacing2);
	}
	.info {
		border-left: 3px solid ${(p) => getCategoryColor(p.category)};
		padding-left: var(--spacing2);
		line-height: 1.4;
		color: var(--almost-white);
	}

	${overlayTextShadow}
	${promotedCommon}
`

export const PromotedDropContainer = styled.div`
	background: url(${(p) => p.image}), var(--almost-white);
	color: var(--black75);
	border: 1px solid var(--gray75);
	${promotedCommon};

	.bottom-container {
		border-top: 1px solid var(--gray75);
		background: rgba(255, 255, 255, 0.8);
		margin: 0;
		height: 140px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		width: 100%;
		text-align: center;
		padding: var(--spacing2) 0;
	}

	.name {
		font-family: var(--font-family--serif);
		max-width: 90%;
		font-weight: bold;
		text-align: center;
		margin: 0 auto;
		padding-bottom: var(--spacing1);
		font-size: var(--font-size--m);
		@media (min-width: ${(p) => p.theme.breakpoints[4]}px) {
			font-size: var(--font-size--l);
			padding-bottom: var(--spacing2);
		}
	}

	.details {
		font-style: italic;
		color: var(--gray0);
	}
`
