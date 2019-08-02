import React, { useState } from "react"
import styled from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LazyLoad from "react-lazy-load"

import LoadingSpinner from "../LoadingSpinner"
import { getImageUrls } from "../../utils/getImageUrl"

export const ErrorIcon = styled(FontAwesomeIcon).attrs({ icon: "exclamation-circle" })`
	font-size: 5rem;
	path {
		color: var(--gray100);
	}
`

const Container = styled.div`
	background: var(--almost-white);
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
`

const LoaderContainer = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 7;
`

const Image = styled.img`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 9;
	object-position: center;
	object-fit: cover;
`

const ImageLoader = ({ onClick, src }) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const [error, setError] = useState(null)

	const onError = () => {
		setError(true)
	}

	const onLoad = () => {
		setIsLoaded(true)
	}

	return error ? (
		<ErrorIcon />
	) : (
		<>
			<Image src={src} onClick={onClick} onLoad={onLoad} onError={onError} contain />
			{!isLoaded && (
				<LoaderContainer>
					<LoadingSpinner delay={400} color="var(--gray100)" />
				</LoaderContainer>
			)}
		</>
	)
}

const FirebaseImage = ({ storageRef, size, loadOffset = 300, ...rest }) => {
	// get all possible urls for this storageRef
	const urls = getImageUrls(storageRef)

	// TODO use srcSet to make this dynamic
	// select url of required size
	const url = urls[size]

	return (
		<LazyLoad debounce={false} throttle={250} offsetVertical={loadOffset}>
			<Container>
				<ImageLoader src={url} {...rest} />
			</Container>
		</LazyLoad>
	)
}

export default FirebaseImage
