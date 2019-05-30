import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"
import moment from "moment"

import { route } from "../../utils"

import {
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
	max-width: 580px;
	width: 100%;

	a {
		border: 1px solid var(--gray75);
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

const CountdownContainer = styled.div`
	padding: var(--spacing1) var(--spacing2);
	border: 1px solid var(--gray75);
	border-radius: 4px;
	position: relative;
	color: var(--gray0);
	::before {
		position: absolute;
		top: -0.8em;
		left: var(--spacing1);
		color: var(--gray50);
		content: "ZA";
		display: block;
		padding: 0 3px;
		background: white;
		font-size: var(--fs-xs);
	}
`

const Name = styled.div`
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

const Countdown = ({ dropsAt }) => {
	const value = moment(dropsAt).format("HH:mm")

	return <CountdownContainer>{value}</CountdownContainer>
}

export const BigDropCard = ({
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
			<Link to={route("DROP_DETAILS", { id })}>
				{imageURL && <FluidImage url={imageURL} />}
				<InfoContainer>
					<TopContainer>
						<div>{itemCategory}</div>
						<Designers value={designers} />
						{/* <Size className="align-right" value={size} /> */}
					</TopContainer>
					<MiddleContainer flex>
						<Name>{name}</Name>
						<div className="align-right">
							<Countdown dropsAt={dropsAtApproxTimestamp} />
						</div>
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
