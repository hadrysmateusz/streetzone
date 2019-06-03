import React from "react"
import styled from "styled-components/macro"
import SwipeableViews from "react-swipeable-views"

import { FluidImage, ErrorIcon } from "../Image"
import { useCarousel, CarouselIndicator, CarouselButton } from "../Carousel"
import LoadingSpinner from "../LoadingSpinner"

import Thumbnails from "./Thumbnails"

import { useImage } from "../../hooks"

const OuterContainer = styled.div`
	display: grid;
	grid-template-rows: 1fr min-content;
	height: 100%;
	> * {
		min-height: 0;
	}
`

const ContentContainer = styled.div`
	position: relative;
	@media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
		margin: 0 calc(-1 * var(--spacing3));
	}
`

const MainImageArea = styled.div`
	height: 100%;
	> * {
		height: 100%;
	}
`

const MainImageContainer = styled.div`
	background: var(--almost-white);
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`

const MainImage = ({ storageRef, index, current, onChangeIndex }) => {
	// load the image, if the image is not currently shown use the defer flag
	const defer = index !== current
	const { imageURL, error, isLoading } = useImage(storageRef, "L", defer)

	return (
		<MainImageContainer>
			{error ? (
				<ErrorIcon />
			) : isLoading ? (
				<LoadingSpinner />
			) : (
				<FluidImage url={imageURL} contain />
			)}
		</MainImageContainer>
	)
}

const ImageGallery = ({ storageRefs }) => {
	const nOfElements = storageRefs.length
	const hasMoreThanOne = nOfElements > 1

	const { current, changeIndex, previous, next } = useCarousel(nOfElements)

	return (
		<OuterContainer>
			<ContentContainer>
				<MainImageArea>
					<SwipeableViews
						index={current}
						onChangeIndex={changeIndex}
						containerStyle={{ height: "100%" }}
					>
						{storageRefs.map((storageRef, i) => (
							<MainImage
								storageRef={storageRef}
								key={storageRef}
								index={i}
								current={current}
							/>
						))}
					</SwipeableViews>
				</MainImageArea>

				{hasMoreThanOne && <CarouselButton onClick={previous} direction="left" />}
				{hasMoreThanOne && <CarouselButton onClick={next} direction="right" />}

				<CarouselIndicator
					nOfElements={nOfElements}
					current={current}
					onClick={changeIndex}
					primaryColor="var(--black25)"
					secondaryColor="var(--gray25)"
					scale={1.5}
				/>
			</ContentContainer>

			{/* Thumbnails */}
			{hasMoreThanOne && (
				<Thumbnails storageRefs={storageRefs} onChangeIndex={changeIndex} />
			)}
		</OuterContainer>
	)
}

export default ImageGallery
