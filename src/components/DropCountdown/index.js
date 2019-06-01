import React, { useState, useEffect } from "react"
import styled from "styled-components/macro"
import moment from "moment"

import { dateFormat } from "../../utils/formatting/formatDropData"
import { useAuthentication, useFirebase } from "../../hooks"
import FollowButton from "./FollowButton"

const CountdownContainer = styled.div`
	/* padding: var(--spacing1) var(--spacing2); */
	border: 1px solid var(--gray75);
	border-radius: 4px;
	position: relative;
	color: var(--gray0);
	white-space: nowrap;
	margin-left: var(--spacing1);
	display: flex;

	.value-container {
		padding: var(--spacing1) var(--spacing2);
		border-right: 1px solid var(--gray75);
	}

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

const DropCountdown = ({ dropsAt, id }) => {
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

	return value ? (
		<CountdownContainer>
			<div className="value-container">{value}</div>
			<FollowButton id={id} />
		</CountdownContainer>
	) : null
}

export default DropCountdown
