import React, { useState } from "react"
import styled from "styled-components/macro"
import SwipeableViews from "react-swipeable-views"
import Lightbox from "react-image-lightbox"

import { FluidImage, ErrorIcon } from "../Image"
import { useCarousel, CarouselIndicator, CarouselButton } from "../Carousel"
import LoadingSpinner from "../LoadingSpinner"

import { Thumbnails } from "./Thumbnails"

import { useImage, useFirebase } from "../../hooks"

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
	cursor: zoom-in;
`

const MainImage = ({ storageRef, index, current, onChangeIndex, onClick }) => {
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
				<FluidImage url={imageURL} contain onClick={onClick} />
			)}
		</MainImageContainer>
	)
}

const ImageGallery = ({ storageRefs, lightboxTitle, showThumbnails }) => {
	const nOfElements = storageRefs.length
	const hasMoreThanOne = nOfElements > 1

	const { current, changeIndex, previous, next } = useCarousel(nOfElements)
	const [isLightboxOpen, setIsLightboxOpen] = useState(false)
	const [fullSizeUrls, setFullSizeUrls] = useState([])
	const firebase = useFirebase()

	const openLightbox = async () => {
		const _fullSizeUrls = await firebase.batchGetImageURLs(storageRefs)
		setFullSizeUrls(_fullSizeUrls)
		setIsLightboxOpen(true)
	}

	const mainSrc = fullSizeUrls[current] || undefined
	const nextSrc = fullSizeUrls[(current + 1) % nOfElements] || undefined
	const prevSrc = fullSizeUrls[(current + nOfElements - 1) % nOfElements] || undefined

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
								onClick={openLightbox}
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
			{showThumbnails && hasMoreThanOne && (
				<Thumbnails storageRefs={storageRefs} onChangeIndex={changeIndex} />
			)}

			{/* Lightbox */}
			{isLightboxOpen && (
				<Lightbox
					mainSrc={mainSrc}
					nextSrc={nextSrc}
					prevSrc={prevSrc}
					onCloseRequest={() => setIsLightboxOpen(false)}
					onMovePrevRequest={previous}
					onMoveNextRequest={next}
					imageTitle={lightboxTitle}
				/>
			)}
		</OuterContainer>
	)
}

export default ImageGallery
