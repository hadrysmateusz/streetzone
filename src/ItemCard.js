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
		let identityId = this.props.item.identityId
		let imageURL = await s3Get(fileKey, identityId)
		this.setState({ imageURL })
	}

	render() {
		const {
			userId,
			name,
			price,
			designers = [],
			createdAt,
			category
		} = this.props.item
		return (
			<div className={styles.ItemCard}>
				<Link to={`/i/${userId}/${createdAt}`}>
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
						<div>{category}</div>
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
		userId: PropTypes.string.isRequired, // Partition key
		createdAt: PropTypes.number.isRequired, // Sort key, Display
		identityId: PropTypes.string.isRequired, // Access to s3
		category: PropTypes.string.isRequired, // Partition key (Index)
		designers: PropTypes.arrayOf(PropTypes.string), // Display
		name: PropTypes.string.isRequired, // Display
		price: PropTypes.number.isRequired, // Sort key, Display
		size: PropTypes.string.isRequired // Display
	})
}

export default ItemCard
