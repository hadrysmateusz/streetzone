import React from "react"
import { Link } from "react-router-dom"
import styles from "./ItemCard.module.scss"
import moment from "moment"
import PropTypes from "prop-types"

const ItemCard = ({ item }) => {
	const { itemId, name, price, designers = [], createdAt } = item
	return (
		<div className={styles.ItemCard}>
			<Link to={"/i/" + itemId}>
				<div className={styles.thumbnail}>
					<img src="https://picsum.photos/200/250/?random" alt="" />
				</div>
				<div className={styles.info}>
					<div className={styles.topContainer}>
						<div className={styles.innerContainer}>
							<div className={styles.designers}>
								{designers.join(" & ").toUpperCase()}
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
