import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import moment from "moment"
import styles from "./ItemCard.module.scss"
import { s3Get } from "./libs/s3lib"

class ItemCard extends Component {
	// TODO: add static image placeholder
	state = {
		imageURL: ""
	}

	componentDidMount = () => {
		this.loadImage()
	}

	loadImage = async () => {
		let fileKey = this.props.item.attachments[0]
		let userId = this.props.item.userId
		let imageURL = await s3Get(fileKey, userId)
		this.setState({ imageURL })
	}

	render() {
		const { itemId, name, price, designers = [], createdAt } = this.props.item
		return (
			<div className={styles.ItemCard}>
				<Link to={"/i/" + itemId}>
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
						</div>
						<div className={styles.date}>
							Dodano: {moment(createdAt).format("D.M.YY")}
						</div>
					</div>
				</Link>
			</div>
		)
	}
}

ItemCard.propTypes = {
	item: PropTypes.shape({
		itemId: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		designers: PropTypes.arrayOf(PropTypes.string),
		createdAt: PropTypes.number.isRequired
	})
}

export default ItemCard
