import React, { Component } from "react"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { withFirebase } from "../Firebase"
import { MiniButton } from "../Basics"

const CurrentImage = styled.div`
	/* cursor: zoom-in; */
	position: relative;
	width: 100%;
	height: 75vw;

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		height: 50vh;
	}

	background: white;
	border: 1px solid #c6c6c6;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		max-height: 100%;
		max-width: 100%;
	}
`

const Container = styled.div`
	flex: 0 1 100%;
	user-select: none;
	min-width: 0;
	margin-bottom: 20px;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		margin-bottom: 0;
	}
`

const ThumbnailsContainer = styled.ul`
	/* clear ul styles */
	list-style: none;
	margin: 0;
	padding: 0;

	/* grid setup */
	display: grid;
	grid-template-columns: repeat(6, minmax(70px, 1fr));
	gap: 10px;

	position: relative;

	/* remove this if it proves to be too difficult to implement a scrolling indicator */
	overflow-x: auto;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		overflow-x: visible;
		grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
	}

	margin-top: 10px;

	li {
		/* setup aspect ratio hack */
		position: relative;
		padding-top: 100%;

		&:after {
			content: "";
			display: block;
		}
	}
`

const Thumbnail = styled.div`
	${(p) => p.isCurrent === false && overlay}

	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	cursor: pointer;

	background: white;
	border: 1px solid #c6c6c6;

	/* required for image centering */
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		max-height: 100%;
		max-width: 100%;
	}
`
const overlay = css`
	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: white;
		opacity: 0.45;
	}
`

export class ImageGallery extends Component {
	state = {
		isLoading: true,
		thumbnailURLs: [],
		imageURLs: [],
		currentImageIndex: 0
	}

	componentDidMount = async () => {
		// Get item attachments' refs and urls for previews

		const { item, firebase } = this.props

		const thumbnailURLs = await firebase.batchGetImageURLs(item.attachments, "S")
		const imageURLs = Array(thumbnailURLs.length).fill(null)
		this.getBigThumbnail(0)

		this.setState({ thumbnailURLs, imageURLs, isLoading: false })
	}

	getBigThumbnail = async (index) => {
		const { item, firebase } = this.props

		try {
			const imageURL = await firebase.getImageURL(item.attachments[index], "L")

			await this.setState((state) => {
				let imageURLs = state.imageURLs
				imageURLs[index] = imageURL
				return { imageURLs }
			})
			console.log("imageURLs: ", this.state.imageURLs)
		} catch (error) {
			console.log(error)
		}
	}

	changeCurrentImage = (e) => {
		let lastIndex = this.state.thumbnailURLs.length - 1
		let newImageIndex = e.currentTarget.dataset.index

		if (newImageIndex > lastIndex) {
			newImageIndex = 0
		} else if (newImageIndex < 0) {
			newImageIndex = lastIndex
		}

		if (!this.state.imageURLs[newImageIndex]) {
			this.getBigThumbnail(newImageIndex)
		}

		this.setState({ currentImageIndex: newImageIndex })
	}

	render() {
		const { thumbnailURLs, imageURLs, currentImageIndex } = this.state
		return (
			<Container>
				<CurrentImage>
					{thumbnailURLs.length > 1 && (
						<MiniButton
							position={{ top: "calc(50% - 25px)", left: "20px" }}
							size={42}
							style={{ paddingRight: "2px" }}
							data-index={+currentImageIndex - 1}
							onClick={this.changeCurrentImage}
						>
							<FontAwesomeIcon icon="angle-left" size="2x" />
						</MiniButton>
					)}
					<img src={imageURLs[currentImageIndex]} alt="" />
					{thumbnailURLs.length > 1 && (
						<MiniButton
							position={{ top: "calc(50% - 25px)", right: "20px" }}
							size={42}
							style={{ paddingLeft: "2px" }}
							data-index={+currentImageIndex + 1}
							onClick={this.changeCurrentImage}
						>
							<FontAwesomeIcon icon="angle-right" size="2x" />
						</MiniButton>
					)}
				</CurrentImage>
				<ThumbnailsContainer>
					{thumbnailURLs.map((url, i) => (
						<li key={i}>
							<Thumbnail
								data-index={i}
								isCurrent={i === +currentImageIndex}
								onClick={this.changeCurrentImage}
							>
								<img src={url} alt="" />
							</Thumbnail>
						</li>
					))}
				</ThumbnailsContainer>
			</Container>
		)
	}
}

export default withFirebase(ImageGallery)
