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
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
`

const LoaderContainer = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
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
	object-fit: ${(p) => p.mode};
`

const ImageLoader = ({
	onClick,
	src,
	mode = "cover",
	deferLoading = false,
	title,
	useSmallLoadingSpinner,
	alt
}) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const [error, setError] = useState(null)

	const onError = () => {
		setError(true)
	}

	const onLoad = () => {
		setIsLoaded(true)
	}

	// TODO: rework this when using srcSet
	// only defer loading if the flag is supplied and the image isn't already loaded
	const isLoadingDeferred = deferLoading && !isLoaded

	return error ? (
		<ErrorIcon />
	) : (
		<>
			{!isLoadingDeferred && (
				<Image
					src={src}
					onClick={onClick}
					onLoad={onLoad}
					onError={onError}
					mode={mode}
					title={title}
					alt={alt}
				/>
			)}
			{!isLoaded && (
				<LoaderContainer>
					<LoadingSpinner
						delay={400}
						color="var(--gray100)"
						size={useSmallLoadingSpinner ? 4 : 9}
					/>
				</LoaderContainer>
			)}
		</>
	)
}

const FirebaseImage = ({
	storageRef,
	size,
	loadOffset = 300,
	height = "100%",
	width = "100%",
	...rest
}) => {
	if (!size) throw Error("FirebaseImage needs a size")

	// get all possible urls for this storageRef
	const urls = getImageUrls(storageRef)

	// TODO use srcSet to make this dynamic (this will require handling missing resolutions)
	// select url of required size
	const url = urls[size]

	const useSmallLoadingSpinner = size === "S"

	return (
		<LazyLoad
			debounce={false}
			throttle={250}
			offsetVertical={loadOffset}
			height={height}
			width={width}
		>
			<Container>
				<ImageLoader
					src={url}
					{...rest}
					useSmallLoadingSpinner={useSmallLoadingSpinner}
				/>
			</Container>
		</LazyLoad>
	)
}

export default FirebaseImage
