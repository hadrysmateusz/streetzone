import React from "react"
import styled, { css } from "styled-components/macro"

import { Image } from "../Image"

import { getImageUrl } from "../../utils/getImageUrl"
import { CONST } from "../../constants"

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
`

const ThumbnailContainer = styled.div`
	position: relative;
	background: var(--almost-white);
	cursor: pointer;
	${(p) =>
		!p.isCurrent &&
		css`
			filter: grayscale(25%);
		`}
`

const InactiveOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.5);
`

export const Thumbnail = ({ storageRef, onClick, isCurrent }) => {
	const imageUrl = getImageUrl(storageRef, "S")

	return (
		<ThumbnailContainer onClick={onClick} isCurrent={isCurrent}>
			<Image url={imageUrl} />
			{!isCurrent && <InactiveOverlay />}
		</ThumbnailContainer>
	)
}

export const Thumbnails = ({ storageRefs, onChangeIndex, current }) => {
	return (
		<ThumbnailsContainer>
			{storageRefs.map((storageRef, i) => (
				<Thumbnail
					storageRef={storageRef}
					key={storageRef}
					isCurrent={current === i}
					onClick={() => onChangeIndex(i)}
				/>
			))}
		</ThumbnailsContainer>
	)
}
