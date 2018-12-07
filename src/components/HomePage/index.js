import React, { Component } from "react"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { Link } from "react-router-dom"
// import API from "@aws-amplify/api"
// import cn from "classnames"
// import benchmark from "../../utils/benchmark"

import { withFirebase } from "../Firebase"
import ItemCard from "../ItemCard"
import CenteredLayout from "../CenteredLayout"
import LoadingSpinner from "../LoadingSpinner"
import FilterForm from "../Filters"
// import FilterForm from "./FilterForm"
// import LoaderButton from "../LoaderButton"

import styles from "./Home.module.scss"
// import animations from "../../scss/animations.module.scss"
import { CONST } from "../../constants"

class HomePage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items: null,
			isLoading: true,
			isRefreshing: false,
			itemsPerPage: CONST.DEFAULT_PAGINATION_ITEMS_PER_PAGE,
			lastEvaluatedKey: null
		}

		// Create default cursor
		// this.state.cursor = {
		// 	itemsPerPage: this.state.itemsPerPage,
		// 	sortBy: "date",
		// 	sortDirection: "DESC",
		// 	filter: {}
		// }
	}

	refresh = async () => {
		// TODO: make this trigger refresh on all Item cards as well
		await this.setState({ isRefreshing: true })

		await this.getItems()
		await this.setState({ isRefreshing: false })
	}

	getMoreItems = async () => {
		// console.log("Getting more")
		// let res = this.getItems({
		// 	...this.state.cursor,
		// 	lastEvaluatedKey: this.state.lastEvaluatedKey
		// })
	}

	filterItems = async (data) => {
		// try {
		// 	this.setState({ lastEvaluatedKey: null })
		// 	const [sortBy = "date", sortDirection = "DESC"] = data.sort.split("-")
		// 	// Create new object as to not overwrite the FilterForm data
		// 	let dataToSend = {
		// 		itemsPerPage: this.state.itemsPerPage,
		// 		sortBy: sortBy,
		// 		sortDirection: sortDirection,
		// 		filter: {
		// 			category: data.category,
		// 			designers: data.designers ? [...data.designers] : [],
		// 			price_min: data.price_min,
		// 			price_max: data.price_max
		// 		}
		// 	}
		// 	console.log("Data To Send", dataToSend)
		// 	await this.getItems(dataToSend)
		// } catch (e) {
		// console.log(e)
		// }
	}

	getItems = async (cursor) => {
		this.setState({ isLoading: true })
	}

	onSubmit = async (data) => {
		// console.log("Filtering...")
		// const res = await this.filterItems(data)
	}

	componentDidMount = async () => {
		console.log("MOUNTED")

		const snapshot = await this.props.firebase.items().get()
		const items = snapshot.docs.map((doc) => ({
			...doc.data(),
			itemId: doc.id
		}))
		this.setState({ items, isLoading: false })
	}

	// renderItems = (currentPage) => {
	// 	const { items, itemsPerPage } = this.state
	// 	const start = itemsPerPage * (currentPage - 1)
	// 	const end = start + itemsPerPage
	// 	console.log(start, end)
	// 	if (items.length % itemsPerPage > 0) {
	// 		// console.log("try getting more")
	// 	}
	// 	return items /* .slice(start, end) */
	// 		.map((item) => {
	// 			return <ItemCard key={item.userId + item.createdAt} item={item} />
	// 		})
	// }

	render() {
		const { items, isLoading, isRefreshing, itemsPerPage } = this.state

		// get current page from props
		const currentPage = this.props.match.params.page || 1

		return (
			<CenteredLayout>
				<div className={styles.mainContainer}>
					<div className={styles.sidebar}>
						<FilterForm />
					</div>
					<div className={styles.content}>
						{!isLoading && items ? (
							items.map((item, i) => {
								return <ItemCard key={i} item={item} />
							})
						) : (
							<LoadingSpinner />
						)}
					</div>
				</div>
			</CenteredLayout>
		)
	}
}

export default withFirebase(HomePage)
