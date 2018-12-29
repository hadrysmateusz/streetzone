import React, { Component } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import moment from "moment"
import { withFirebase } from "../Firebase"

import { CSS } from "../../constants"

const Container = styled.div`
	height: 365px;
	overflow: hidden;
	min-width: 0;
	min-height: 0;
	border: 1px solid #c6c6c6;
	box-shadow: 0 3px 6px -2px rgba(0, 0, 0, 0.13);
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
	border-top: 1px solid #eaeaea;
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

const BottomContainer = styled.div`
	font-size: 0.83rem;
	color: #888;
	padding: 9px 9px 11px;
	border-top: 1px solid #e0e0e0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`

const InnerContainer = styled.div`
	display: flex;
	justify-content: space-between;
	font-weight: bold;
	line-height: 0.89rem;
	margin-bottom: 4px;
`

const Price = styled.div`
	color: ${CSS.COLOR_ACCENT};
	font-size: 0.89rem;
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
	padding-top: 3px;
	font-size: 0.83rem;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	white-space: nowrap;
`

const Condition = styled.div`
	font-weight: 500;
`

const Size = styled.div``

const translateCondition = (conditionValue) => {
	if (conditionValue === 12) {
		return {
			displayValue: "DS",
			tooltip: "Stan: Nowy - Oryginalne"
		}
	} else if (conditionValue === 11) {
		return {
			displayValue: "VNDS",
			tooltip: "Stan: Prawie Nowy - Bez śladów użytkowania"
		}
	} else if (conditionValue <= 10 && conditionValue >= 0) {
		return {
			displayValue: `${conditionValue}/10`,
			tooltip: `Stan: ${conditionValue}/10`
		}
	}
}

class ItemCard extends Component {
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
		let ref = this.props.firebase.storageRef.child(
			this.props.item.attachments[0]
		)

		try {
			const imageURL = await ref.getDownloadURL()
			this.setState({ imageURL })
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		const {
			itemId,
			name,
			price,
			designers = [],
			createdAt,
			condition,
			size
		} = this.props.item

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
								<Price>{price}zł</Price>
							</InnerContainer>
							<Name title={name}>{name}</Name>
							<SecondaryContainer>
								<Condition title={conditionObj.tooltip}>
									{conditionObj.displayValue}
								</Condition>
								<Size title="Rozmiar">{size}</Size>
							</SecondaryContainer>
						</TopContainer>
						<BottomContainer>
							Dodano {moment(createdAt).format("D.M.YY o HH:mm")}
						</BottomContainer>
					</InfoContainer>
				</Link>
			</Container>
		)
	}
}

export default withFirebase(ItemCard)
