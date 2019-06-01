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

const formatValue = (dropsAt) => {
	const then = moment(dropsAt, dateFormat)
	const now = moment()

	const duration = moment.duration(then.diff(now))

	const totalHours = Math.floor(duration.asHours())
	const totalDays = Math.floor(duration.asDays())
	const minutes = duration.minutes()

	const isDropInFuture = then.isAfter(now) // this isn't reliable for dates without specified time
	const isHourKnown = dropsAt && dropsAt.length > 11
	const isSoon = totalHours && totalHours <= 48
	const isToday = now.isSame(then, "day")

	// isDropInFuture isn't reliable for dates without specified time so it requires a special case
	if (!isDropInFuture && isToday) {
		return "Dzisiaj"
	}

	// all further cases require the date to be in the future
	if (!isDropInFuture) {
		return null
	}

	// 21 hours is when moment starts to show hours instead of days
	// if the hour isn't known, prevent from showing misleading information
	if (!isHourKnown && totalHours <= 21) {
		return "Jutro"
	}

	// if the drop is very soon and the exact time is known, display countdown
	if (isSoon) {
		return `${totalHours}h ${minutes}min`
	}

	// by default return date formatted by moment.js
	return moment().to(then, true)
}

const DropCountdown = ({ dropsAt, id }) => {
	const [value, setValue] = useState(null)

	useEffect(() => {
		const getValue = () => {
			const value = formatValue(dropsAt)
			setValue(value)
		}

		// get first values instantly
		getValue()

		// update every minute
		const id = setInterval(getValue, 60000)

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
