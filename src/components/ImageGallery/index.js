import React, { Component } from "react"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { withFirebase } from "../Firebase"
import { MiniButton } from "../Basics"
import { CSS } from "../../constants"
import { BREAKPOINTS } from "../../constants/const"

const CurrentImage = styled.div`
	/* cursor: zoom-in; */
	position: relative;
	width: 100%;
	height: 30vh;
	/* @media (min-width: 950px) {
		height: 45vh;
	} */
	@media (min-width: ${BREAKPOINTS[3]}px) {
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

	@media (min-width: ${BREAKPOINTS[2]}px) {
		/* max-width: 50%; */
		/* padding-right: 40px; */
	}
`

const ThumbnailsContainer = styled.div`
	display: grid;
	gap: 10px;
	min-width: 0;

	grid-template-columns: repeat(6, 1fr);

	@media (max-width: ${BREAKPOINTS[0] - 1}px) {
	grid-template-columns: repeat(6, 70px);

	}
		overflow-x: auto;


	/* grid-template-columns: repeat(4, 1fr);
	@media (min-width: ${BREAKPOINTS[0]}px) {
		grid-template-columns: repeat(6, 1fr);
	} */

	margin-top: 10px;
`

const Thumbnail = styled.div`
	${(p) => p.isCurrent === false && overlay}
	position: relative;

	height: 70px;
	min-width: 70px;
	min-height: 70px;
	/* max-height: 20.6vw; */

	@media (min-width: ${BREAKPOINTS[0]}px) {
		max-height: 14.2vw;
		height: 80px;
	}

	@media (min-width: ${BREAKPOINTS[1]}px) {
		max-height: 14.2vw;
		height: 112px;
	}

	@media (min-width: ${BREAKPOINTS[2]}px) {
		max-height: 8.3vw;
		height: 90px;
	}

	@media (min-width: ${BREAKPOINTS[3]}px) {
		max-height: 8.6vw;
		height: 92px;
	}

	cursor: pointer;

	background: white;
	border: 1px solid #c6c6c6;

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
