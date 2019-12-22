import React, { memo } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"
import moment from "moment"

import { FluidImage } from "../Image"

import { route } from "../../utils"

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

export const SmallDropCard = memo(
	({
		id,
		name,
		designers,
		itemCategory,
		imageUrls,
		mainImageIndex,
		dropsAtApproxTimestamp
	}) => {
		const imageURL = imageUrls ? imageUrls[mainImageIndex] : ""
		const date = moment(dropsAtApproxTimestamp).format("LL")

		return (
			<Container>
				<Link to={route("DROP_DETAILS", { id })}>
					<FluidImage url={imageURL} />
					<InfoContainer>
						<TopContainer>
							<div>{itemCategory}</div>
							<Designers value={designers} />
						</TopContainer>
						<MiddleContainer>
							<Name>{name}</Name>
						</MiddleContainer>
						<BottomContainer>
							<DateContainer>{date}</DateContainer>
						</BottomContainer>
					</InfoContainer>
				</Link>
			</Container>
		)
	}
)
