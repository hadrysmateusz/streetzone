import React, { Component } from "react"
import { API } from "aws-amplify"
import styles from "./Home.module.scss"
import ItemCard from "./ItemCard"
import CenteredLayout from "./CenteredLayout"
import LoadingSpinner from "./components/LoadingSpinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import cn from "classnames"
import animations from "./scss/animations.module.scss"

class Home extends Component {
	state = {
		items: null,
		isLoading: true
	}

	getItems = async () => {
		this.setState({ isLoading: true })
		try {
			let data = await API.get("items", "/items")
			this.setState({ items: data.items })
		} catch (e) {
			console.log("Database connection error")
		}
		this.setState({ isLoading: false })
	}

	componentDidMount = async () => {
		this.getItems()
	}

	render() {
		const { items, isLoading } = this.state
		return (
			<CenteredLayout>
				<div className={styles.header}>
					{items && <h4>{items.length} Wyniki</h4>}
					<FontAwesomeIcon
						icon="sync"
						className={cn({ [animations.spinning]: isLoading })}
						onClick={this.getItems}
					/>
				</div>
				<div className={styles.mainContainer}>
					{!isLoading && items ? (
						items.map((item) => <ItemCard key={item.itemId} item={item} />)
					) : (
						<LoadingSpinner />
					)}
				</div>
			</CenteredLayout>
		)
	}
}

export default Home
