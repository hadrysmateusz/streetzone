import React, { Component } from "react"
import API from "@aws-amplify/api"
import styles from "./Home.module.scss"
import ItemCard from "./ItemCard"
import CenteredLayout from "./CenteredLayout"
import LoadingSpinner from "./components/LoadingSpinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import cn from "classnames"
import animations from "./scss/animations.module.scss"
// import Auth from "@aws-amplify/auth"

class Home extends Component {
	state = {
		items: null,
		isLoading: true,
		isRefreshing: false
	}

	refresh = async () => {
		// TODO: make this trigger refresh on all Item cards as well
		await this.setState({ isRefreshing: true })
		await this.getItems()
		await this.setState({ isRefreshing: false })
	}

	getItems = async () => {
		try {
			let data = await API.get("items", "/items")
			let items = data.items.sort((a, b) => b.createdAt - a.createdAt)
			this.setState({ items })
		} catch (e) {
			console.log("Database connection error")
		}
	}

	componentDidMount = async () => {
		await this.getItems()
		await this.setState({ isLoading: false })
	}

	render() {
		const { items, isLoading, isRefreshing } = this.state
		return (
			<CenteredLayout>
				<div className={styles.mainContainer}>
					<div className={styles.sidebar}>
						<h4>Filtry</h4>
						{items && (
							<div className={styles.header}>
								{items.length} Wyniki&nbsp;
								<FontAwesomeIcon
									icon="sync"
									className={cn({ [animations.spinning]: isRefreshing })}
									onClick={this.refresh}
								/>
							</div>
						)}
					</div>
					<div className={styles.content}>
						{!isLoading && items ? (
							items.map((item) => <ItemCard key={item.itemId} item={item} />)
						) : (
							<LoadingSpinner />
						)}
					</div>
				</div>
			</CenteredLayout>
		)
	}
}

export default Home
