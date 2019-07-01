// DEPRECATED
import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { withBreakpoints } from "react-breakpoints"

import { HeartButton, TYPE } from "../SaveButton"
import LoadingSpinner from "../LoadingSpinner"

import { ThumbnailContainer, StyledIcon, Container, FluidImage } from "./StyledComponents"

import { useImage } from "../../hooks"
import { itemDataHelpers } from "../../utils"

const { formatDesigners, formatPrice, formatSize } = itemDataHelpers

export const ItemCardImage = ({ imageId }) => {
	const { imageURL, error } = useImage(imageId, "M")
	const isLoading = imageURL === null

	return (
		<ThumbnailContainer>
			{error ? (
				<StyledIcon icon="image" />
			) : isLoading ? (
				<LoadingSpinner size={7} delay={500} />
			) : (
				<img src={imageURL} alt="" />
			)}
		</ThumbnailContainer>
	)
}

export const ItemCard = withBreakpoints(({ item, currentBreakpoint, ...rest }) => {
	const { id, name, price, designers, category, size, attachments, mainImageIndex } = item

	const { imageURL } = useImage(attachments[mainImageIndex], "M")

	const formattedDesigners = formatDesigners(designers)
	const formattedPrice = formatPrice(price)
	const formattedSize = formatSize(size)
	return (
		<Container viewMode="grid">
			<Link to={`/i/${id}`}>
				{imageURL && <FluidImage url={imageURL} />}
				<div className="info-container">
					<div className="top-container">
						<div className="category">{category}</div>
						<div className="designers">{formattedDesigners}</div>
						<div className="size">{formattedSize}</div>
					</div>
					<div className="name">{name}</div>
					<div className="bottom-container">
						<div className="price">{formattedPrice}</div>
						<div className="like-button">
							<HeartButton id={id} type={TYPE.ITEM} scale={1.5} />
						</div>
					</div>
				</div>
			</Link>
		</Container>
	)
})

export const ItemCardHorizontal = withBreakpoints(
	({ item, currentBreakpoint, ...rest }) => {
		const {
			id,
			name,
			price,
			designers,
			category,
			createdAt,
			description,
			size,
			attachments,
			mainImageIndex
		} = item

		const { imageURL } = useImage(attachments[mainImageIndex], "M")

		const formattedDesigners = formatDesigners(designers)
		const formattedPrice = formatPrice(price)
		const formattedDescription = description.slice(0, 180) + "..."
		const formattedSize = formatSize(size)

		return (
			<Container viewMode="list">
				<Link to={`/i/${id}`}>
					<div className="info-container">
						<div className="top-container">
							<div className="category">{category}</div>
							<div className="designers">{formattedDesigners}</div>
							<div className="size">{formattedSize}</div>
						</div>
						<div className="name">{name}</div>
						<div className="createdAt">
							Dodano {moment(createdAt).format("D.M.YY o HH:mm")}
						</div>
						<div className="description">{formattedDescription}</div>
						<div className="bottom-container">
							<div className="price">{formattedPrice}</div>
							<div className="like-button">
								<HeartButton id={id} type={TYPE.ITEM} scale={1.5} />
							</div>
						</div>
					</div>
					{imageURL && <FluidImage url={imageURL} />}
				</Link>
			</Container>
		)
	}
)

export default ItemCard
