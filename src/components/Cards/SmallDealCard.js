import React, { memo } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"
import moment from "moment"

import { FluidImage } from "../Image"

import { route } from "../../utils"
import { useImage } from "../../hooks"

import {
	Name,
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
	max-width: 310px;
	width: 100%;
	background: white;

	a {
		${cardBorder}
		overflow: hidden;
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: 140px min-content;
		@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
			grid-template-rows: 165px min-content;
		}
	}
`

export const SmallDealCardDumb = memo(({ id, title, designers, imageUrl, createdAt }) => (
	<Container>
		<Link to={route("DEAL_DETAILS", { id })}>
			<FluidImage url={imageUrl} />
			<InfoContainer>
				<TopContainer>
					<Designers value={designers} />
				</TopContainer>
				<MiddleContainer>
					<Name>{title}</Name>
				</MiddleContainer>
				<BottomContainer>
					<DateContainer>{createdAt}</DateContainer>
				</BottomContainer>
			</InfoContainer>
		</Link>
	</Container>
))

export const SmallDealCard = memo(({ imageRef, createdAt, ...rest }) => {
	const { imageURL } = useImage(imageRef, "M")
	const formattedCreatedAt = moment(createdAt).format("LL")
	return (
		<SmallDealCardDumb imageUrl={imageURL} createdAt={formattedCreatedAt} {...rest} />
	)
})
