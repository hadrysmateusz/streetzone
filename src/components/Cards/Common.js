import React from "react"

import formatDesigners from "../../utils/formatDesigners"
import formatSize from "../../utils/formatSize"
import formatPrice from "../../utils/formatPrice"

import styled from "styled-components/macro"
import { ellipsis, getCategoryColor } from "../../style-utils"

export const InfoContainer = styled.div`
	padding: var(--spacing2);
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		padding: var(--spacing3);
	}
`

export const BottomContainer = styled.div`
	display: flex;
	.align-right {
		margin-left: auto;
	}
`

export const MiddleContainer = styled.div`
	padding-top: var(--spacing1);
	padding-bottom: var(--spacing2);
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

export const Designers = ({ value }) => (
	<div
		css={`
			font-weight: bold;
		`}
	>
		{formatDesigners(value)}
	</div>
)

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
			color: var(--error0);
			font-weight: bold;
			flex-shrink: 0;
		`}
	>
		{formatPrice(value)}
	</div>
)

export const FluidImage = styled.div`
	width: 100%;
	height: 100%;
	background-image: url("${(p) => p.url}");
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`
