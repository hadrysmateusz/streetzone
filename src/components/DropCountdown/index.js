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
	const [value, setValue] = useState(null)

	useEffect(() => {
		const getValues = () => {
			const then = moment(dropsAt, dateFormat)
			const now = moment()

			const isDropInFuture = then.isAfter(now)

			if (isDropInFuture) {
				const duration = moment.duration(then.diff(now))

				const totalHours = Math.floor(duration.asHours())
				const totalDays = Math.floor(duration.asDays())
				const minutes = duration.minutes()

				const isHourKnown = dropsAt && dropsAt.length > 11
				const isSoon = totalDays && totalDays <= 3
				const isToday = totalHours <= 21 // based on moment.js "time to" breakpoints

				// format value based on a few parameters
				if (isHourKnown && isSoon) {
					setValue(`${totalHours}h ${minutes}min`)
				} else if (!isHourKnown && isToday) {
					setValue("Dzisiaj") // TODO: this might be inaccessible because of conflict with isDropInFuture
				} else {
					setValue(moment().to(then, true))
				}
			} else {
				setValue(null)
			}
		}

		// get first values instantly
		getValues()

		// update every 20 seconds
		const id = setInterval(getValues, 20000)

		return () => clearInterval(id)
	}, [dropsAt])

	// const formattedValue = formatValue(values)

	return value ? (
		<CountdownContainer>
			<div className="value-container">{value}</div>
			<FollowButton id={id} />
		</CountdownContainer>
	) : null
}

export default DropCountdown
