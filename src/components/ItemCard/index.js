import React, { Component } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import moment from "moment"

import { CSS } from "../../constants"

import { withFirebase } from "../Firebase"

class ItemCardUnstyled extends Component {
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
			<div className={this.props.className}>
				<Link to={`/i/${itemId}`}>
					<div className="thumbnail">
						<img src={this.state.imageURL} alt="" />
					</div>
					<div className="info">
						<div className="topContainer">
							<div className="innerContainer">
								<div className="designers">
									{designers && designers.join(" & ").toUpperCase()}
								</div>
								<div className="price">
									{price}
									zł
								</div>
							</div>
							<div className="name">{name}</div>
						</div>
						<div className="date">
							Dodano {moment(createdAt).format("D.M.YY o HH:mm")}
						</div>
					</div>
				</Link>
			</div>
		)
	}
}

const ItemCard = styled(ItemCardUnstyled)`
	height: 365px;

	margin: 10px auto;
	border: 2px solid ${CSS.COLOR_BLACK};
	/* box-shadow: 0 0 5px rgba(0, 0, 0, 0.25); */

	@media (min-width: 600px) {
		width: calc(50% - 14px);
		max-width: 330px;
		margin: 7px;
	}

	@media (min-width: 1100px) {
		width: calc(33.333% - 14px);
	}

	.innerContainer {
		display: flex;
		justify-content: space-between;
		font-size: 0.91rem;
		font-weight: bold;
	}

	.price {
		color: ${CSS.COLOR_ACCENT};
	}

	.thumbnail {
		background: ${CSS.COLOR_THUMBNAIL_BG};
		height: 263px;

		img {
			object-fit: contain;
			width: 100%;
			height: 100%;
		}
	}

	.info {
		padding: 0 8px;
	}

	.designers {
		text-transform: uppercase;
		margin-bottom: 4px;
		padding-right: 10px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.name {
		color: #333;
		font-size: 0.91rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.date {
		color: #777;
		font-size: 0.88rem;
		padding: 10px 7px 11px;
		margin-top: 10px;
		border-top: 1px solid #bbb;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.topContainer {
		padding: 14px 7px 0;
	}
`

export default withFirebase(ItemCard)
