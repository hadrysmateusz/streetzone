import React from "react"
import { Link } from "react-router-dom"
import Ratio from "react-ratio"

import { withAuthentication } from "../UserSession"
import { HeartButton, TYPE } from "../SaveButton"
import LoadingSpinner from "../LoadingSpinner"

import formatDesigners from "../../utils/formatDesigners"
import formatPrice from "../../utils/formatPrice"
import formatSize from "../../utils/formatSize"
import { useImage } from "../../hooks"
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

export const ItemCardImage = ({ imageId }) => {
	const [imageURL, error] = useImage(imageId)
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
	const { id, name, price, designers, size } = item

	const formattedDesigners = formatDesigners(designers)
	const formattedPrice = formatPrice(price)
	const formattedSize = formatSize(size)

	return (
		<Ratio ratio={2 / 3}>
			<Container {...rest}>
				<Link to={`/i/${id}`}>
					<ItemCardImage imageId={item.attachments[0]} />

					<InfoContainer>
						<TopContainer>
							<InnerContainer>
								<Designers title={formattedDesigners}>{formattedDesigners}</Designers>
								<Name title={name}>{name}</Name>
							</InnerContainer>
							<HeartButton id={id} type={TYPE.ITEM} scale={2} />
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
	const { id, name, price, designers, size } = item

	const formattedDesigners = formatDesigners(designers)
	const formattedPrice = formatPrice(price)
	const formattedSize = formatSize(size)

	return (
		<MiniContainer {...rest}>
			<Link to={`/i/${id}`}>
				<ItemCardImage imageId={item.attachments[0]} />

				<InfoContainer>
					<TopContainer>
						<InnerContainer>
							<Designers title={formattedDesigners}>{formattedDesigners}</Designers>
							<Name title={name}>{name}</Name>
						</InnerContainer>
						<HeartButton id={id} type={TYPE.ITEM} scale={2} />
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
