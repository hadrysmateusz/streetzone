import React, { Component } from "react"
import styles from "./ImageGallery.module.scss"
import cn from "classnames"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { withFirebase } from "../Firebase"

export class ImageGalleryUnstyled extends Component {
	state = {
		isLoading: true,
		imageURLs: [],
		currentImageIndex: 0
	}

	componentDidMount = async () => {
		// Get item attachments' refs and urls for previews
		const imageURLs = await this.props.firebase.getImageURLs(this.props.item.attachments)

		this.setState({ imageURLs, isLoading: false })
	}

	changeCurrentImage = (e) => {
		let lastIndex = this.state.imageURLs.length - 1
		console.log("lastIndex: ", lastIndex)
		let newImageIndex = e.currentTarget.dataset.index

		if (newImageIndex > lastIndex) {
			newImageIndex = 0
		} else if (newImageIndex < 0) {
			console.log("less")
			newImageIndex = lastIndex
		}
		console.log("newImageIndex: ", newImageIndex)

		this.setState({ currentImageIndex: newImageIndex })
	}

	render() {
		const { imageURLs, currentImageIndex } = this.state
		return (
			<div className={styles.photosContainer}>
				{/* TODO: Make image gallery into separate component */}
				<div className={styles.currentImage}>
					{imageURLs.length > 1 && (
						<div
							className={cn(styles.navigation, styles.previous)}
							data-index={+currentImageIndex - 1}
							onClick={this.changeCurrentImage}
						>
							<FontAwesomeIcon icon="angle-left" size="2x" />
						</div>
					)}
					<img src={imageURLs[currentImageIndex]} alt="" />
					{imageURLs.length > 1 && (
						<div
							className={cn(styles.navigation, styles.next)}
							data-index={+currentImageIndex + 1}
							onClick={this.changeCurrentImage}
						>
							<FontAwesomeIcon icon="angle-right" size="2x" />
						</div>
					)}
				</div>
				<div className={styles.thumbnailsContainer}>
					{imageURLs.map((url, i) => {
						console.log(i, +currentImageIndex, i === +currentImageIndex)
						const classNames = cn({
							[styles.thumbnailContainer]: true,
							[styles.currentThumbnail]: i === +currentImageIndex
						})
						console.log(classNames)
						return (
							<div
								key={i}
								data-index={i}
								className={classNames}
								onClick={this.changeCurrentImage}
							>
								<img src={url} className={styles.thumbnail} alt="" />
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}

const ImageGallery = styled(ImageGalleryUnstyled)`
	.photosContainer {
		flex: 0 0 100%;
		user-select: none;
		@media (min-width: 700px) {
			max-width: 50%;
			padding-right: 20px;
		}
	}

	.navigation {
		opacity: 0.86;
		transition: all 0.2s;
		background: ${CSS.COLOR_BLACK};
		color: ${CSS.COLOR_WHITE};
		font-size: 15px;

		width: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 12px;

		border-radius: 50%;
		position: absolute;
		top: calc(50% - 25px);
		box-shadow: 0 0 10px rgba(3, 3, 3, 0.3);
		&:hover {
			background: black;
		}
	}

	.next {
		right: 20px;
		padding-right: 13px;
		padding-left: 15px;
	}

	.previous {
		left: 20px;
		padding-right: 15px;
		padding-left: 13px;
	}

	.currentImage {
		/* cursor: zoom-in; */
		position: relative;
		width: 100%;
		height: 30vh;
		@media (min-width: 950px) {
			height: 45vh;
		}
		@media (min-width: 1050px) {
			height: 50vh;
		}

		background: ${CSS.COLOR_THUMBNAIL_BG};
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;

		img {
			max-height: 100%;
			max-width: 100%;
		}

		/* &:hover .navigation {
		display: block;
	} */
	}

	.thumbnailsContainer {
		display: flex;
		flex-direction: row;
	}

	/* TODO: handle images of different aspect ratios (probably by setting it as background or editing on server side or sth */
	.thumbnailContainer {
		/* @media (max-width: 350px) {
		display: none;
	} */
		filter: grayscale(85%);
		cursor: pointer;
		height: 74px;
		width: 74px;
		@media (min-width: 950px) {
			height: 84px;
			width: 84px;
		}
		@media (min-width: 1050px) {
			height: 98px;
			width: 98px;
		}

		background: ${CSS.COLOR_THUMBNAIL_BG};
		margin: 10px 10px 0 0;
		display: flex;
		justify-content: center;
		align-items: center;

		&:last-child {
			margin-right: 0;
		}
		img {
			max-height: 100%;
			max-width: 100%;
		}
	}

	.currentThumbnail {
		filter: grayscale(0);
	}
`

export default withFirebase(ImageGallery)
