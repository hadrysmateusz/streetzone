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

	&:hover {
		transform: translateY(-3px);
	}
`

const ThumbnailContainer = styled.div`
	/* background: #fafafa; */
	height: 260px;

	/* padding-bottom: 4px; */

	img {
		object-fit: contain;
		width: 100%;
		height: 100%;
	}
`

const InfoContainer = styled.div`
	padding: 0 8px;
	background: white;
	border-top: 1px solid #eaeaea;
	/* box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.05); */
`

const TopContainer = styled.div`
	padding: 14px 7px 0;
	color: #3a3a3a;

	/* border-top: 1px solid #e0e0e0; */
	/* border-bottom: 1px solid #e0e0e0; */
`

const Name = styled.div`
	color: #555;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 0.89rem;
	line-height: 1.3rem;
`

const BottomContainer = styled.div`
	color: #888;
	font-size: 0.88rem;
	padding: 10px 7px 11px;
	margin-top: 10px;
	border-top: 1px solid #e0e0e0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`

const InnerContainer = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 0.91rem;
	font-weight: bold;
`

const Price = styled.div`
	color: ${CSS.COLOR_ACCENT};
	font-size: 0.86rem;
`

const Designers = styled.div`
	text-transform: uppercase;
	margin-bottom: 4px;
	padding-right: 8px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	word-spacing: 0.35ch;
	font-size: 0.86rem;
`

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
		let ref = this.props.firebase.storageRef.child(this.props.item.attachments[0])

		try {
			const imageURL = await ref.getDownloadURL()
			this.setState({ imageURL })
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		const { itemId, name, price, designers = [], createdAt } = this.props.item
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
