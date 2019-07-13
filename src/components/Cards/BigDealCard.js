import React, { memo } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { FluidImage } from "../Image"

import { route } from "../../utils"
import { useImage } from "../../hooks"

import {
	Designers,
	TopContainer,
	MiddleContainer,
	BottomContainer,
	DateContainer,
	InfoContainer,
	cardBorder
} from "./Common"

const Container = styled.div`
	min-width: 0; /* this has to be on the outermost component*/
	max-width: 580px;
	width: 100%;
	background: white;
	/* box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1); */

	> a {
		${cardBorder}
		overflow: hidden;
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: 180px min-content;
		@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
			grid-template-rows: 200px min-content;
		}
		@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
			grid-template-rows: 270px min-content;
		}
	}
`

const Title = styled.div`
	--line-height: 1.5em;

	color: var(--black0);
	font-size: var(--fs-s);
	font-family: var(--font-family--serif);
	font-weight: bold;
	line-height: var(--line-height);
	height: calc(2 * var(--line-height));
	overflow: hidden;
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		font-size: var(--fs-m);
	}
`

const ValueContainer = styled.div`
	border: 1px solid var(--gray75);
	border-radius: 4px;
	position: relative;
	color: var(--gray0);
	white-space: nowrap;
	margin-left: var(--spacing1);
	display: flex;
	align-items: center;

	.value-container {
		padding: var(--spacing1) var(--spacing2);
		border-right: 1px solid var(--gray75);
	}
`

const ExternalLink = styled.a`
	padding: var(--spacing1) 7px;
	font-size: 1.3rem;
	:hover {
		color: var(--black0);
	}
`

const Value = ({ value, link }) => (
	<ValueContainer>
		<div className="value-container">{value}</div>
		<ExternalLink href={link} onClick={(e) => e.stopPropagation()} title="Idź do okazji">
			<FontAwesomeIcon icon="external-link-alt" />
		</ExternalLink>
	</ValueContainer>
)

const BigDealCardDumb = memo(
	({ id, title, designers, imageUrl, value, link, createdAt }) => (
		<Container>
			<Link to={route("DEAL_DETAILS", { id })}>
				<FluidImage url={imageUrl} />
				<InfoContainer>
					<TopContainer>
						<Designers value={designers} />
					</TopContainer>
					<MiddleContainer flex>
						<Title>{title}</Title>
						<div className="align-right">
							<Value value={value} link={link} />
						</div>
					</MiddleContainer>
					<BottomContainer>
						<DateContainer>{createdAt}</DateContainer>
					</BottomContainer>
				</InfoContainer>
			</Link>
		</Container>
	)
)

export const BigDealCard = memo(({ imageRef, createdAt, ...rest }) => {
	const { imageURL } = useImage(imageRef, "M")
	const formattedCreatedAt = moment(createdAt).format("LL")
	return <BigDealCardDumb imageUrl={imageURL} createdAt={formattedCreatedAt} {...rest} />
})
