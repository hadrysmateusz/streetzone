import React from "react"
import styled, { css } from "styled-components/macro"

import { ellipsis, getCategoryColor } from "../../style-utils"
import { itemDataHelpers } from "../../utils"

const { formatDesigners, formatPrice, formatSize } = itemDataHelpers

export const cardBorder = css`
	border: 1px solid var(--gray75);
	transition: border-color 200ms ease;
	:hover {
		border: 1px solid var(--gray25);
	}
`

export const InfoContainer = styled.div`
	display: grid;
	grid-template-rows: auto auto 1fr;
	grid-template-columns: 100%;
	min-height: 0;
	min-width: 0;
	height: 100%;
	padding: var(--spacing2);
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		padding: var(--spacing3);
	}
`

export const BottomContainer = styled.div`
	display: flex;

	${(p) => p.pinToBottom && "align-self: end;"}

	.align-right {
		margin-left: auto;
	}
`

const middleContainerFlex = css`
	display: flex;
	align-items: center;
	.align-right {
		margin-left: auto;
	}
`

export const MiddleContainer = styled.div`
	padding-top: var(--spacing1);
	padding-bottom: var(--spacing2);

	${(p) => p.flex && middleContainerFlex}
`

export const TopContainer = styled.div`
	display: flex;
	font-size: var(--font-size--xs);
	color: var(--gray0);
	text-transform: uppercase;

	/* prevent children from taking up more space than they need */
	> * {
		${ellipsis}
		flex: 0 1 auto;
	}

	/* add spacing between children */
	> * + * {
		padding-left: var(--spacing2);
		@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
			padding-left: var(--spacing3);
		}
	}
`

export const Name = styled.div`
	--line-height: 1.5em;

	color: var(--black0);
	font-size: ${(p) => p.big && "var(--font-size--l)"};
	font-family: var(--font-family--serif);
	font-weight: bold;
	line-height: var(--line-height);
	height: calc(2 * var(--line-height));
	overflow: hidden;
`

export const DateContainer = styled.div`
	${(p) => p.withMargin && "margin: var(--spacing2) 0;"}
	font-size: var(--font-size--xs);
	color: var(--gray0);
`

export const PostCategory = styled.div`
	font-size: var(--font-size--xs);
	color: var(--gray0);
	font-weight: bold;
	text-transform: uppercase;

	border-left: 3px solid ${(p) => getCategoryColor(p.category)};
	padding-left: var(--spacing2);
	line-height: 1.4;
`

export const Designers = ({ value }) => {
	const formatted = formatDesigners(value)
	return (
		<div
			css={`
				font-weight: bold;
			`}
		>
			{formatted}
		</div>
	)
}

export const Size = ({ value }) => (
	<div
		css={`
			margin-left: auto;
			color: var(--black0);
			font-weight: bold;
			flex-shrink: 0;
		`}
	>
		{formatSize(value)}
	</div>
)

export const Price = ({ value }) => (
	<div
		css={`
			color: var(--danger0);
			font-weight: bold;
			flex-shrink: 0;
		`}
	>
		{formatPrice(value)}
	</div>
)
