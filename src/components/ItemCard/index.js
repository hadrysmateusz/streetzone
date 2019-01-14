import React, { Component } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { withFirebase } from "../Firebase"

import { translateCondition } from "../../constants/item_schema"

const Container = styled.div`
	height: 345px;
	overflow: hidden;
	min-width: 0;
	min-height: 0;
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	box-shadow: 0 3px 6px -2px rgba(0, 0, 0, 0.12);
	transition: transform 0.18s ease;
	background: white;

	a {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	&:hover {
		transform: translateY(-3px);
	}
`

const ThumbnailContainer = styled.div`
	min-height: 0; /* prevent content from overflowing container */
	flex: 1 1 100%;

	img {
		object-fit: contain;
		width: 100%;
		height: 100%;
	}
`

const InfoContainer = styled.div`
	padding: 0 9px;
	background: white;
	border-top: 1px solid ${(p) => p.theme.colors.gray[100]};
`

const TopContainer = styled.div`
	padding: 12px 9px 9px;
	color: #3a3a3a;
`

const Name = styled.div`
	color: #555;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 0.9rem;
	line-height: 1.15rem;
`

const InnerContainer = styled.div`
	display: flex;
	justify-content: space-between;
	font-weight: bold;
	line-height: 0.89rem;
	margin-bottom: 4px;
`

const Price = styled.div`
	color: ${(p) => p.theme.colors.accent};
	font-size: 0.89rem;
	text-align: left;
	font-weight: 500;
`

const Designers = styled.div`
	font-size: 0.87rem;
	text-transform: uppercase;
	padding-right: 8px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	word-spacing: 0.35ch;
`

const SecondaryContainer = styled.div`
	border-top: 1px solid ${(p) => p.theme.colors.gray[100]};
	padding: 10px 12px;
	font-size: 0.83rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	white-space: nowrap;
`

const Condition = styled.div`
	font-weight: 500;
	text-align: center;
	color: #666;
`

const Size = styled.div`
	font-weight: 500;
	text-align: right;
`

class ItemCardBase extends Component {
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
		const { itemId, name, price, designers = [], condition, size } = this.props.item

		let conditionObj = translateCondition(condition)

		return (
			<Container className={this.props.className}>
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
							</InnerContainer>
							<Name title={name}>{name}</Name>
						</TopContainer>
						<SecondaryContainer>
							<Price title={`Cena: ${price}`}>{price}zł</Price>
							<Condition title={`Stan: ${conditionObj.tooltip}`}>
								{conditionObj.displayValue}
							</Condition>
							<Size title={size ? `Rozmiar: ${size}` : undefined}>{size}</Size>
						</SecondaryContainer>
					</InfoContainer>
				</Link>
			</Container>
		)
	}
}

const ItemCard = withFirebase(ItemCardBase)

const AlgoliaItemCard = ({ hit, ...props }) => <ItemCard item={hit} {...props} />

export default ItemCard
export { AlgoliaItemCard }
