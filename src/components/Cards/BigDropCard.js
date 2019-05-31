import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"
import moment from "moment"

import { route } from "../../utils"
import { dateFormat } from "../../utils/formatting/formatDropData"

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
	// const [hours, setHours] = useState()
	// const [minutes, setMinutes] = useState()
	const [totalDays, setTotalDays] = useState()
	const [totalHours, setTotalHours] = useState()
	const [hours, setHours] = useState()
	const [minutes, setMinutes] = useState()

	useEffect(() => {
		const getValues = () => {
			const then = moment(dropsAt, dateFormat)
			const now = moment()

			const isDropInFuture = then.isAfter(now)

			if (isDropInFuture) {
				const duration = moment.duration(then.diff(now))

				const __totalHours = Math.floor(duration.asHours())
				const __totalDays = Math.floor(duration.asDays())
				const __hours = duration.hours()
				const __minutes = duration.minutes()

				setTotalDays(__totalDays)
				setTotalHours(__totalHours)
				setHours(__hours)
				setMinutes(__minutes)
			}
		}

		// this means the string contains at least the full date and hour of the drop
		if (dropsAt.length >= 11) {
			getValues()

			// update every 20 seconds
			const id = setInterval(getValues, 20000)

			return () => clearInterval(id)
		}
	}, [dropsAt])

	// const value = hours && minutes ? `${hours}:${minutes}` : "?"

	let value

	if (totalDays && totalDays <= 3) {
		if (totalHours && minutes) {
			value = `${totalHours}h ${minutes}m`
		} else if (totalHours) {
			value = `${totalHours}godzin`
		}
	} else if (totalDays && hours) {
		value = `${totalDays}dni ${hours}h`
	} else if (totalDays) {
		value = `${totalDays}dni`
	}

	return value ? <CountdownContainer>{value}</CountdownContainer> : null
}

export const BigDropCard = ({
	id,
	name,
	designers,
	itemCategory,
	imageUrls,
	mainImageIndex,
	dropsAtApproxTimestamp,
	dropsAtString
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
					</TopContainer>
					<MiddleContainer flex>
						<Name>{name}</Name>
						<div className="align-right">
							<Countdown dropsAt={dropsAtString} />
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
