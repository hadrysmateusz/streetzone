import React, { Component, useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { compose } from "recompose"
import Ratio from "react-ratio"

import { withFirebase } from "../Firebase"
import { withAuthentication } from "../UserSession"
import { HeartButton } from "../SaveButton"
import LoadingSpinner from "../LoadingSpinner"

import { FirebaseContext } from "../Firebase"
import formatDesigners from "../../utils/formatDesigners"
import formatPrice from "../../utils/formatPrice"
import formatSize from "../../utils/formatSize"
import {
	MiniContainer,
	Container,
	ThumbnailContainer,
	InfoContainer,
	TopContainer,
	InnerContainer,
	Designers,
	Name,
	SecondaryContainer,
	Price,
	Size,
	StyledIcon
} from "./StyledComponents"

const ERR_NO_IMAGE = "NO_IMAGE"

function useImage(attachment) {
	const firebase = useContext(FirebaseContext)
	const [imageURL, setImageURL] = useState(null)
	const [error, setError] = useState(null)

	const fetchImage = async () => {
		try {
			const imageURL = await firebase.getImageURL(attachment, "M")
			setImageURL(imageURL)
		} catch (error) {
			setError(ERR_NO_IMAGE)
			console.log(error)
		}
	}

	useEffect(() => {
		fetchImage()
	})

	return [imageURL, error]
}

export const ItemCardImage = ({ imageId }) => {
	const [imageURL, error] = useImage(imageId, [imageId])
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

const ItemCardBase = ({ item, ...rest }) => {
	const { itemId, name, price, designers, size } = item

	const formattedDesigners = formatDesigners(designers)
	const formattedPrice = formatPrice(price)
	const formattedSize = formatSize(size)

	return (
		<Ratio ratio={2 / 3}>
			<Container {...rest}>
				<Link to={`/i/${itemId}`}>
					<ItemCardImage imageId={item.attachments[0]} />

					<InfoContainer>
						<TopContainer>
							<InnerContainer>
								<Designers title={formattedDesigners}>{formattedDesigners}</Designers>
								<Name title={name}>{name}</Name>
							</InnerContainer>
							<HeartButton id={itemId} type="item" scale={2} />
						</TopContainer>
						<SecondaryContainer>
							<Price title={price ? `Cena: ${price}` : null}>{formattedPrice}</Price>
							<Size title={size ? `Rozmiar: ${formattedSize}` : null}>
								{formattedSize}
							</Size>
						</SecondaryContainer>
					</InfoContainer>
				</Link>
			</Container>
		</Ratio>
	)
}

const ItemCardMiniBase = ({ item, ...rest }) => {
	const { itemId, name, price, designers, size } = item

	const formattedDesigners = formatDesigners(designers)
	const formattedPrice = formatPrice(price)
	const formattedSize = formatSize(size)

	return (
		<MiniContainer {...rest}>
			<Link to={`/i/${itemId}`}>
				<ItemCardImage imageId={item.attachments[0]} />

				<InfoContainer>
					<TopContainer>
						<InnerContainer>
							<Designers title={formattedDesigners}>{formattedDesigners}</Designers>
							<Name title={name}>{name}</Name>
						</InnerContainer>
						<HeartButton id={itemId} type="item" scale={2} />
					</TopContainer>
					<SecondaryContainer>
						<Price title={price ? `Cena: ${price}` : null}>{formattedPrice}</Price>
						<Size title={size ? `Rozmiar: ${formattedSize}` : null}>{formattedSize}</Size>
					</SecondaryContainer>
				</InfoContainer>
			</Link>
		</MiniContainer>
	)
}

export const ItemCard = withAuthentication(ItemCardBase)
export const ItemCardMini = withAuthentication(ItemCardMiniBase)
