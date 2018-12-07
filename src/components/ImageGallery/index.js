import React, { Component } from "react"
import PropTypes from "prop-types"
import styles from "./ImageGallery.module.scss"
import cn from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withFirebase } from "../Firebase"

export class ImageGallery extends Component {
	state = {
		isLoading: true,
		imageURLs: [],
		currentImageIndex: 0
	}

	componentDidMount = async () => {
		// Get item attachments' refs and urls for previews
		const imageURLs = await this.props.firebase.getImageURLs(
			this.props.item.attachments
		)

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

ImageGallery.propTypes = {
	item: PropTypes.object.isRequired
}

export default withFirebase(ImageGallery)
