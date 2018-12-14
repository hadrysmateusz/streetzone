import React, { Component } from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import styles from "./ItemCard.module.scss"
import { itemSchema } from "../../constants"
import styled from "styled-components"
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
			<Link to={`/i/${itemId}`}>
				<div>
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
				</div>
			</Link>
		)
	}
}

const ItemCard = styled(ItemCardUnstyled)``

export default withFirebase(ItemCard)
