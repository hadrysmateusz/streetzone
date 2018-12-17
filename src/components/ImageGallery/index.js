import React, { Component } from "react"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { withFirebase } from "../Firebase"
import { MiniButton } from "../Basics"
import { CSS } from "../../constants"

const Container = styled.div`
	flex: 0 0 100%;
	user-select: none;
	@media (min-width: 700px) {
		max-width: 50%;
		padding-right: 20px;
	}
`

const CurrentImage = styled.div`
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
`

const ThumbnailsContainer = styled.div`
	display: flex;
	flex-direction: row;
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
const Thumbnail = styled.div`
	${(p) => p.isCurrent === false && overlay}
	cursor: pointer;
	height: 74px;
	width: 74px;
	position: relative;
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
`

export class ImageGallery extends Component {
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
		let newImageIndex = e.currentTarget.dataset.index

		if (newImageIndex > lastIndex) {
			newImageIndex = 0
		} else if (newImageIndex < 0) {
			newImageIndex = lastIndex
		}

		this.setState({ currentImageIndex: newImageIndex })
	}

	render() {
		const { imageURLs, currentImageIndex } = this.state
		return (
			<Container>
				<CurrentImage>
					{imageURLs.length > 1 && (
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
					{imageURLs.length > 1 && (
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
					{imageURLs.map((url, i) => (
						<Thumbnail
							key={i}
							data-index={i}
							isCurrent={i === +currentImageIndex}
							onClick={this.changeCurrentImage}
						>
							<img src={url} alt="" />
						</Thumbnail>
					))}
				</ThumbnailsContainer>
			</Container>
		)
	}
}

export default withFirebase(ImageGallery)
