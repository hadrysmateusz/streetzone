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
			<div className={styles.ItemCard}>
				<Link to={`/i/${itemId}`}>
					<div className={styles.thumbnail}>
						<img src={this.state.imageURL} alt="" />
					</div>
					<div className={styles.info}>
						<div className={styles.topContainer}>
							<div className={styles.innerContainer}>
								<div className={styles.designers}>
									{designers && designers.join(" & ").toUpperCase()}
								</div>
								<div className={styles.price}>
									{price}
									zł
								</div>
							</div>
							<div className={styles.name}>{name}</div>
							<div className={styles.name}>
								<em>{this.props.item.category}</em>
							</div>
						</div>
						<div className={styles.date}>
							Dodano {moment(createdAt).format("D.M.YY o HH:mm")}
						</div>
					</div>
				</Link>
			</div>
		)
	}
}

const ItemCard = styled(ItemCardUnstyled)``

export default withFirebase(ItemCard)
