import React, { Component } from "react"
import { Link } from "react-router-dom"
import { withFirebase } from "../Firebase"
import { compose } from "recompose"
import { withAuthentication } from "../UserSession"
import Ratio from "react-ratio"

import { translateCondition } from "../../constants/item_schema"
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
	Condition,
	Size
} from "./StyledComponents"
import { HeartButton } from "../SaveButton"

const ERR_NO_IMAGE = "NO_IMAGE"

class ItemCardBase extends Component {
	state = {
		imageURL: "",
		error: null
	}

	componentDidMount = () => {
		this.loadImage()
	}

	// Make sure if component's props change the images get updated
	componentDidUpdate = (prevProps) => {
		if (prevProps.item.attachments[0] !== this.props.item.attachments[0]) {
			this.loadImage()
		}
	}

	loadImage = async () => {
		const { item, firebase } = this.props

		try {
			const imageURL = await firebase.getImageURL(item.attachments[0], "M")
			this.setState({ imageURL })
		} catch (error) {
			this.setState({ error: ERR_NO_IMAGE })
			console.log(error)
		}
	}

	render() {
		const {
			itemId,
			name,
			price,
			designers = [],
			condition,
			size = "--"
		} = this.props.item

		let conditionObj = translateCondition(condition)

		return (
			<Ratio ratio={2 / 3}>
				<Container className={this.props.className}>
					<Link to={`/i/${itemId}`}>
						<ThumbnailContainer>
							{this.state.error && this.state.error === ERR_NO_IMAGE ? (
								"No image"
							) : (
								<img src={this.state.imageURL} alt="" />
							)}
						</ThumbnailContainer>
						<InfoContainer>
							<TopContainer>
								<InnerContainer>
									{designers && (
										<Designers title={designers.join(" X ")}>
											{designers.join(" X ").toUpperCase()}
										</Designers>
									)}
									<Name title={name}>{name}</Name>
								</InnerContainer>
								<HeartButton itemId={itemId} />
							</TopContainer>
							<SecondaryContainer>
								<Price title={`Cena: ${price}`}>{price}zł</Price>
								{condition && (
									<Condition title={`Stan: ${conditionObj.tooltip}`}>
										{conditionObj.displayValue}
									</Condition>
								)}
								<Size title={size ? `Rozmiar: ${size}` : undefined}>{size}</Size>
							</SecondaryContainer>
						</InfoContainer>
					</Link>
				</Container>
			</Ratio>
		)
	}
}

class ItemCardMiniBase extends Component {
	state = { imageURL: "" }

	componentDidMount = () => {
		this.loadImage()
	}

	// Make sure if component's props change the images get updated
	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.item.attachments[0] !== this.props.item.attachments[0]) {
			this.loadImage()
		}
	}

	loadImage = async () => {
		const { item, firebase } = this.props

		try {
			const imageURL = await firebase.getImageURL(item.attachments[0], "M")
			this.setState({ imageURL })
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		const { itemId, name, price, designers = [], size } = this.props.item

		return (
			<MiniContainer className={this.props.className}>
				<Link to={`/i/${itemId}`}>
					<ThumbnailContainer>
						<img src={this.state.imageURL} alt="" />
					</ThumbnailContainer>
					<InfoContainer>
						<TopContainer>
							<InnerContainer>
								{designers && (
									<Designers title={designers.join(" X ")}>
										{designers.join(" X ").toUpperCase()}
									</Designers>
								)}
								<Name title={name}>{name}</Name>
							</InnerContainer>
						</TopContainer>
						<SecondaryContainer>
							<Price title={`Cena: ${price}`}>{price}zł</Price>
							<Size title={size ? `Rozmiar: ${size}` : undefined}>{size}</Size>
						</SecondaryContainer>
					</InfoContainer>
				</Link>
			</MiniContainer>
		)
	}
}

const ItemCard = compose(
	withAuthentication,
	withFirebase
)(ItemCardBase)
const ItemCardMini = compose(
	withAuthentication,
	withFirebase
)(ItemCardMiniBase)

export { ItemCard, ItemCardMini }
