import React from "react"
import styled from "styled-components/macro"
import SwipeableViews from "react-swipeable-views"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { FluidImage, Image } from "../Image"
import { useCarousel, CarouselIndicator, CarouselButton } from "../Carousel"

import { useImage } from "../../hooks"
import { CONST } from "../../constants"
import LoadingSpinner from "../LoadingSpinner"

const ContentContainer = styled.div`
	height: 100%;
	> * {
		height: 100%;
	}
`

const InnerContainer = styled.div`
	position: relative;
	@media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
		margin: 0 calc(-1 * var(--spacing3));
	}
`

const OuterContainer = styled.div`
	display: grid;
	grid-template-rows: 1fr min-content;
	> * {
		min-height: 0;
	}

	@media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
		max-height: 58vh;
		height: 100%;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		height: 100%;
	}
`

const ThumbnailsContainer = styled.div`
	display: grid;
	gap: var(--spacing2);
	grid-template-columns: repeat(
		${CONST.ATTACHMENTS_MAX_COUNT},
		minmax(calc(100vw / 5.5), 1fr)
	);

		/* make the content go from edge to edge on mobile*/
		@media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
			--x-margin: calc(-1 * var(--spacing3));
			margin-left: var(--x-margin);
			margin-right: var(--x-margin);
			padding: 0 var(--spacing3);
			&::after {
				content: "";
				display: block;
				width: var(--spacing2);
			}
		}

		/* position: relative; */
		margin-top: var(--spacing2);

		/* remove this if it proves to be too difficult to implement a scrolling indicator */
		overflow-x: auto;

		@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
			grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
		}
		@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
			overflow-x: visible;
		}


	}
`

const ThumbnailContainer = styled.div`
	background: var(--almost-white);
	/* border: 1px solid var(--gray75); */
	cursor: pointer;
`

const MainImageContainer = styled.div`
	background: var(--almost-white);
	/* border: 1px solid var(--gray75); */
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`

export const ErrorIcon = styled(FontAwesomeIcon).attrs({ icon: "image" })`
	font-size: 5rem;
	path {
		color: ${(p) => p.theme.colors.gray[100]};
	}
`

const Thumbnail = ({ storageRef, onClick }) => {
	const { imageURL, error } = useImage(storageRef, "S")

	return (
		<ThumbnailContainer onClick={onClick}>
			{error ? <ErrorIcon /> : <Image url={imageURL} />}
		</ThumbnailContainer>
	)
}

const Thumbnails = ({ storageRefs, onChangeIndex }) => {
	return (
		<ThumbnailsContainer>
			{storageRefs.map((storageRef, i) => (
				<Thumbnail
					storageRef={storageRef}
					key={storageRef}
					onClick={() => onChangeIndex(i)}
				/>
			))}
		</ThumbnailsContainer>
	)
}

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
			<InnerContainer>
				<ContentContainer>
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
				</ContentContainer>

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
			</InnerContainer>

			{/* Thumbnails */}
			{hasMoreThanOne && (
				<Thumbnails storageRefs={storageRefs} onChangeIndex={changeIndex} />
			)}
		</OuterContainer>
	)
}

export default ImageGallery
