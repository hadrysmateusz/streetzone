import React, { useState, useEffect } from "react"
import styled from "styled-components/macro"
import moment from "moment"

import { dateFormat } from "../../utils/formatting/formatDropData"
import { useAuthentication } from "../../hooks"

import FollowButton from "./FollowButton"

const CountdownContainer = styled.div`
	border: 1px solid var(--gray75);
	border-radius: 4px;
	position: relative;
	color: var(--gray0);
	white-space: nowrap;
	margin-left: var(--spacing1);
	display: flex;

	.value-container {
		padding: var(--spacing1) var(--spacing2);
		:not(:last-child) {
			border-right: 1px solid var(--gray75);
		}
	}

	::before {
		position: absolute;
		top: -0.8em;
		left: var(--spacing1);
		color: var(--gray50);
		${(p) => !p.isArchival && "content: 'ZA';"}
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
	const minutes = duration.minutes()

	const isDropInFuture = then.isAfter(now) // this isn't reliable for dates without specified time
	const isTimeKnown = dropsAt && dropsAt.length > 9
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
	if (!isTimeKnown && totalHours <= 21) {
		return "Jutro"
	}

	// if the drop is very soon and the exact time is known, display countdown
	if (isTimeKnown && isSoon) {
		return `${totalHours}h ${minutes}min`
	}

	// by default return date formatted by moment.js
	return moment().to(then, true)
}

const DropCountdown = ({ dropsAt, id }) => {
	const [authUser, isAuthenticated] = useAuthentication(true)
	const [value, setValue] = useState(null)
	const [isSaved, setIsSaved] = useState(false)

	// get the isSaved value
	useEffect(() => {
		const isSaved =
			isAuthenticated && authUser.followedDrops && authUser.followedDrops.includes(id)

		setIsSaved(isSaved)
	}, [authUser, id])

	useEffect(() => {
		const getValue = () => {
			const value = formatValue(dropsAt)
			setValue(value)
		}

		// get first value instantly
		getValue()

		// update every minute
		const id = setInterval(getValue, 60000)

		return () => clearInterval(id)
	}, [dropsAt])

	return value ? (
		<CountdownContainer>
			<div className="value-container">{value}</div>
			<FollowButton id={id} />
		</CountdownContainer>
	) : (
		<CountdownContainer isArchival>
			<div className="value-container">Archiwum</div>
			{/* only show the follow button in archival drops if it is active */}
			{isSaved && <FollowButton id={id} />}
		</CountdownContainer>
	)
}

export default DropCountdown
