import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import moment from "moment"
import styles from "./ItemCard.module.scss"
import { itemSchema } from "../../constants"
import { withFirebase } from "../Firebase"

class ItemCard extends Component {
	// TODO: add static image placeholder
	state = {
		imageURL: ""
	}

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
		// console.log(this.props.item)
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

ItemCard.propTypes = {
	item: PropTypes.shape({
		createdAt: PropTypes.number.isRequired,
		designers: PropTypes.arrayOf(PropTypes.string),
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		size: PropTypes.string.isRequired
	})
}

ItemCard.defaultProps = {
	item: {
		createdAt: Date.now(),
		designers: itemSchema.designers.slice(0, 2),
		name: "Nike Air Max",
		price: 500,
		size: "42"
	}
}

export default withFirebase(ItemCard)
