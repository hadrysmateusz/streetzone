import React from "react"
import styled from "styled-components"

const imageSize = 100

const Image = styled.img`
	display: block;
	border-radius: 50%;
	height: ${imageSize}px;
	margin: 0;
`

const Container = styled.div`
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: flex-start;
`

const EmptyState = ({ text, state }) => {
	return state ? (
		<Container>
			<Image src={state.image} alt="" />
			<p>{state.text}</p>
		</Container>
	) : (
		<div>{text}</div>
	)
}

export default EmptyState
