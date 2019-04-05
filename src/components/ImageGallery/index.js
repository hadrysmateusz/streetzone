import React, { Component } from "react"
import styled, { css } from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Lightbox from "react-image-lightbox"

import { withFirebase } from "../Firebase"
import { MiniButton } from "../Basics"
import { CONST } from "../../constants"
import LoadingSpinner from "../LoadingSpinner"

const CurrentImage = styled.div`
	cursor: zoom-in;
	position: relative;
	width: 100%;
	max-height: 45vh;
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		max-height: 85vh;
	}
	height: 640px;

	background: white;
	/* border: 1px solid ${(p) => p.theme.colors.gray[75]}; */

	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		max-height: 100%;
		max-width: 100%;
	}
`

export const StyledIcon = styled(FontAwesomeIcon)`
	font-size: 5rem;
	path {
		color: ${(p) => p.theme.colors.gray[100]};
	}
`

const Container = styled.div`
	width: 100%;
	max-width: 100%;
	flex: 0 1 100%;
	user-select: none;
	min-width: 0;
	margin-bottom: 10px;
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
	grid-template-columns: repeat(
		${CONST.ATTACHMENTS_MAX_COUNT},
		minmax(calc(100vw / 5.5), 1fr)
	);
	gap: 10px;

	position: relative;

	/* remove this if it proves to be too difficult to implement a scrolling indicator */
	overflow-x: auto;

	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
	}
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		overflow-x: visible;
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
	border: 1px solid ${(p) => p.theme.colors.gray[75]};

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

const ERR_NO_IMAGE = "NO_IMAGE"

export class ImageGallery extends Component {
	state = {
		isLoading: true,
		thumbnailURLs: [],
		imageURLs: [],
		currentImageIndex: 0,
		isOpen: false
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
		this.setState({ isLoading: true })

		try {
			const imageURL = await firebase.getImageURL(item.attachments[index], "L")

			await this.setState((state) => {
				let imageURLs = state.imageURLs
				imageURLs[index] = imageURL
				return { imageURLs }
			})
		} catch (error) {
			this.setState({ error: ERR_NO_IMAGE })
			console.log(error)
		} finally {
			this.setState({ isLoading: false })
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

	openLightbox = async () => {
		this.setState(async (state) => {
			const imageURLs = await Promise.all(
				state.imageURLs.map((url, i) => this.getBigThumbnail(i))
			)
			return { imageURLs }
		})
		this.setState({ isOpen: true })
	}

	render() {
		const { thumbnailURLs = [], imageURLs, currentImageIndex, isOpen } = this.state

		const mainSrc = imageURLs[currentImageIndex] || undefined
		const nextSrc = imageURLs[(currentImageIndex + 1) % imageURLs.length] || undefined
		const prevSrc =
			imageURLs[(currentImageIndex + imageURLs.length - 1) % imageURLs.length] ||
			undefined

		// console.log(mainSrc, nextSrc, prevSrc)

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
					{this.state.error ? (
						<StyledIcon icon="image" />
					) : this.state.isLoading ? (
						<LoadingSpinner />
					) : (
						<img src={imageURLs[currentImageIndex]} alt="" onClick={this.openLightbox} />
					)}
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
				{thumbnailURLs.length > 1 && (
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
				)}
				{isOpen && (
					<Lightbox
						mainSrc={mainSrc}
						nextSrc={nextSrc}
						prevSrc={prevSrc}
						onCloseRequest={() => this.setState({ isOpen: false })}
						onMovePrevRequest={() =>
							this.setState({
								currentImageIndex:
									(currentImageIndex + imageURLs.length - 1) % imageURLs.length
							})
						}
						onMoveNextRequest={() =>
							this.setState({
								currentImageIndex: (currentImageIndex + 1) % imageURLs.length
							})
						}
						imageTitle={
							<>
								<strong>{this.props.item.designers.join(" x ")}</strong> -{" "}
								{this.props.item.name}
							</>
						}
					/>
				)}
			</Container>
		)
	}
}

export default withFirebase(ImageGallery)
