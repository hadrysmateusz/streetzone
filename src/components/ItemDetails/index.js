import React from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components/macro"

import { Image } from "../../components/Image"

import { useDesigner } from "../../hooks"
import { encodeURL } from "../../utils/algoliaURLutils"
import { route, itemDataHelpers } from "../../utils"

const { formatDesigners } = itemDataHelpers

export const InfoContainer = styled.div`
	flex: 0 0 100%;
	background: white;
`

export const ItemContainer = styled.div`
	position: relative;
	display: grid;
	max-width: 100%;
	height: 100%;
	gap: var(--spacing3);
	grid-template-columns: 100%;
	@media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
		grid-template-rows: minmax(270px, 65vmin);
	}
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: 2fr minmax(340px, 1fr);
	}
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		gap: var(--spacing4);
	}
`

export const HeaderContainer = styled.div`
	.designers {
		font-size: var(--fs-xs);
		text-transform: uppercase;
		color: var(--gray0);
	}
	.name {
		font-size: var(--fs-l);
		color: var(--black0);
		font-weight: bold;
	}

	padding-bottom: var(--spacing1);
	border-bottom: 1px solid var(--gray75);
	margin-bottom: var(--spacing3);
`

export const DetailsContainer = styled.div`
	display: flex;
	align-content: center;
	margin-bottom: var(--spacing3);
	overflow-x: auto;

	> * + * {
		margin-left: var(--spacing3);
		@media (min-width: ${(p) => p.theme.breakpoints[4]}px) {
			margin-left: var(--spacing4);
		}
	}
`

export const Description = styled.div`
	.content {
		color: var(--black25);
	}
	margin-bottom: var(--spacing3);
`

export const DatesContainer = styled.div`
	display: flex;
	margin-bottom: var(--spacing3);

	> * + * {
		margin-left: var(--spacing2);
		@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
			margin-left: var(--spacing3);
		}
	}
`

export const BrandsContainer = styled.div`
	padding-left: var(--spacing3);
	display: flex;
	align-content: center;
	justify-content: flex-end;
	margin-left: auto;
	> * + * {
		margin-left: var(--spacing2);
	}
`

export const MiscBar = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: var(--spacing4) 0;
	padding: var(--spacing3) var(--spacing3);
	text-align: center;

	@media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
		flex-direction: column;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		border-top: 1px solid var(--gray75);
		border-bottom: 1px solid var(--gray75);
	}

	.group {
		display: flex;
		align-items: center;

		@media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
			flex-direction: column;
			:not(:last-child) {
				margin-bottom: var(--spacing3);
			}
		}
		@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
			:not(:last-child) {
				margin-right: var(--spacing4);
			}
		}
	}

	.group-name {
		@media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
			margin-bottom: var(--spacing2);
		}
		@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
			margin-right: var(--spacing3);
		}
		text-transform: uppercase;
		font-size: var(--fs-xs);
		color: var(--gray0);
	}
`

export const DesignerLink = ({ value, children }) => {
	return (
		<Link to={encodeURL({ designers: [value] }, route("MARKETPLACE"))}>{children}</Link>
	)
}

export const Brands = ({ designers }) => {
	return (
		<BrandsContainer>
			{designers.map((designer) => (
				<Logo name={designer} key={designer} />
			))}
		</BrandsContainer>
	)
}

export const Logo = ({ name }) => {
	const designer = useDesigner(name)

	return designer ? (
		<div
			css={css`
				width: 40px;
				height: 40px;
				border-radius: 50%;
				overflow: hidden;
				border: 1px solid var(--gray75);
			`}
		>
			<DesignerLink value={designer.label}>
				<Image url={designer.logoURL} title={designer.label} />
			</DesignerLink>
		</div>
	) : null
}

export const Header = ({ designers, name }) => {
	let formattedDesigners = formatDesigners(designers)

	return (
		<HeaderContainer>
			<div className="designers">{formattedDesigners}</div>
			<div className="name">{name}</div>
		</HeaderContainer>
	)
}
