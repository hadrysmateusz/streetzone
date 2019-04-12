import React, { useState, useEffect } from "react"
import { BarLoader } from "react-css-loaders"
import PropTypes from "prop-types"
import styled from "styled-components"

import EmptyState from "../EmptyState"

const SpinnerContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	height: ${(p) => p.size * 40}px;
	max-height: 100%;
`

const LoadingSpinner = ({ size = 9, color = "#cfcfcf", delay = 200 }) => {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const timeoutId = setTimeout(() => setIsVisible(true), delay)
		return () => clearTimeout(timeoutId)
	}, [])

	return isVisible ? (
		<SpinnerContainer size={size}>
			<BarLoader size={size} color={color || "#cfcfcf"} />
		</SpinnerContainer>
	) : null
}

LoadingSpinner.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string,
	delay: PropTypes.number
}

const LoadableComponentSpinner = ({ error, pastDelay, timedOut }) => {
	if (error) {
		console.log(error)
		return (
			<EmptyState src="SadFace.png">
				Coś poszło nie tak, odśwież stronę lub spróbuj później
			</EmptyState>
		)
	} else if (timedOut) {
		return (
			<EmptyState src="SadFace.png">
				Serwer długo nie odpowiada, odśwież stronę lub spróbuj później
			</EmptyState>
		)
	} else if (pastDelay) {
		return <LoadingSpinner />
	} else {
		return null
	}
}

export default LoadingSpinner
export { LoadableComponentSpinner }
