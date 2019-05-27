import styled, { css } from "styled-components/macro"
import { ellipsis, overlayTextShadow, getCategoryColor } from "../../style-utils"

export const TagsContainer = styled.div`
	display: flex;
	flex-flow: row wrap;
	> *:not(:last-child) {
		margin-right: var(--spacing2);
		${ellipsis}
	}
	color: var(--gray50);
`

export const FluidImage = styled.div`
	width: 100%;
	height: 100%;
	background-image: url("${(p) => p.url}");
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`

export const Image = styled.div`
	width: 100%;
	height: 0;
	padding-bottom: 100%;
	background-image: url("${(p) => p.url}");
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`

export const PromotedContainer = styled.div`
	display: grid;
	gap: var(--spacing2);

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing3);
		height: 40vw;
		max-height: 500px;
	}
`

const promotedCommon = css`
	width: 100%;
	height: 100%;
	background-size: cover;
	background-position: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	padding: var(--spacing3) 0;
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
	${overlayTextShadow}
	${promotedCommon}

	.title {
		font-family: var(--font-family--serif);
		font-size: var(--font-size--m);
		font-weight: bold;
		max-width: 75vw;
		text-align: center;
	}
	.info {
		border-left: 3px solid ${(p) => getCategoryColor(p.category)};
		padding-left: var(--spacing2);
		line-height: 1.4;
		margin: var(--spacing1) 0;
		color: var(--almost-white);
	}
`

export const PromotedDropContainer = styled.div`
	background: url(${(p) => p.image});
	color: var(--black75);
	border: 1px solid var(--gray75);
	${promotedCommon};
`
