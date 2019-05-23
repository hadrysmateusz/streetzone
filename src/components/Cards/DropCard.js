import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"
import moment from "moment"

import { route } from "../../utils"

import {
	Name,
	Designers,
	TopContainer,
	MiddleContainer,
	BottomContainer,
	DateContainer,
	InfoContainer,
	FluidImage
} from "./Common"

const Container = styled.div`
	min-width: 0; /* this has to be on the outermost component*/
	max-width: 300px;

	a {
		border: 1px solid var(--gray75);
		overflow: hidden;
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: 140px min-content;
		@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
			grid-template-rows: 165px min-content;
		}
	}
`

export const SmallDropCard = ({
	id,
	name,
	designers,
	itemCategory,
	imageUrls,
	mainImageIndex,
	dropsAtApproxTimestamp
}) => {
	const imageURL = imageUrls[mainImageIndex]
	const date = moment(dropsAtApproxTimestamp).format("LL")

	return (
		<Container>
			<Link to={route("ITEM_DETAILS", { id })}>
				{imageURL && <FluidImage url={imageURL} />}
				<InfoContainer>
					<TopContainer>
						<div>{itemCategory}</div>
						<Designers value={designers} />
						{/* <Size className="align-right" value={size} /> */}
					</TopContainer>
					<MiddleContainer>
						<Name>{name}</Name>
					</MiddleContainer>
					<BottomContainer>
						<DateContainer>{date}</DateContainer>
						{/* <HeartButton
							css={`
								color: var(--gray25);
							`}
							id={id}
							type={TYPE.ITEM}
							scale={1.5}
						/> */}
					</BottomContainer>
				</InfoContainer>
			</Link>
		</Container>
	)
}
