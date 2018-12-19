import React, { Component } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import moment from "moment"
import { withFirebase } from "../Firebase"

import { CSS } from "../../constants"

const Container = styled.div`
	height: 365px;
	overflow: hidden;

	border: 2px solid ${CSS.COLOR_BLACK};
	width: 100%;
`

const ThumbnailContainer = styled.div`
	background: ${CSS.COLOR_THUMBNAIL_BG};
	height: 260px;

	img {
		object-fit: contain;
		width: 100%;
		height: 100%;
	}
`

const InfoContainer = styled.div`
	padding: 0 8px;
`

const TopContainer = styled.div`
	padding: 14px 7px 0;
`

const Name = styled.div`
	color: #333;
	font-size: 0.91rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 1.3rem;
`

const BottomContainer = styled.div`
	color: #777;
	font-size: 0.88rem;
	padding: 10px 7px 11px;
	margin-top: 10px;
	border-top: 1px solid #bbb;
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
`

const Designers = styled.div`
	text-transform: uppercase;
	margin-bottom: 4px;
	padding-right: 10px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
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
									<Designers>{designers.join(" & ").toUpperCase()}</Designers>
								)}
								<Price>{price}zł</Price>
							</InnerContainer>
							<Name>{name}</Name>
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
