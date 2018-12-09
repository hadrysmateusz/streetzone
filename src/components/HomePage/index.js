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
			isFiltering: false
		}
	}

	// refresh = async () => {
	// 	// TODO: make this trigger refresh on all Item cards as well
	// 	await this.setState({ isRefreshing: true })
	// 	await this.getItems()
	// 	await this.setState({ isRefreshing: false })
	// }

	filterItems = async (values) => {
		await this.setState({ isFiltering: true })

		const [sortBy, sortDirection] = values.sort.split("-")
		// Create new object as to not overwrite the FilterForm data

		let filters = {}
		if (values.category) filters.category = values.category
		if (values.designer) filters.designer = values.designer
		if (values.price_min) filters.price_min = values.price_min
		if (values.price_max) filters.price_max = values.price_max

		let filterData = {
			sortBy,
			sortDirection,
			filters
		}
		await this.makeQuery(filterData)
		await this.setState({ isFiltering: false })
	}

	makeQuery = async (data) => {
		try {
			const { sortBy, sortDirection, filters = {} } = data

			let query = this.props.firebase.items()

			if (filters) {
				const { category, designer, price_min, price_max } = filters

				if (category) {
					query = query.where("category", "==", category)
				}
				if (designer) {
					query = query.where("designers", "array-contains", designer)
				}
				if (price_min) {
					query = query.where("price", ">=", +price_min)
				}
				if (price_max) {
					query = query.where("price", "<=", +price_max)
				}
				// When using range comparison operators
				// the first sorting has to be by the same property
				if ((price_max || price_min) && sortBy !== "price") {
					query = query.orderBy("price")
				}

				query = query.orderBy(sortBy, sortDirection)

				const snapshot = await query.get()
				const items = snapshot.docs.map((doc) => ({
					...doc.data(),
					itemId: doc.id
				}))

				return this.setState({ items, isLoading: false })
			}
		} catch (e) {
			console.log(e)
		}
	}

	getItems = async (query) => {
		this.setState({ isLoading: true })
		const snapshot = await query.get()
		const items = snapshot.docs.map((doc) => ({
			...doc.data(),
			itemId: doc.id
		}))
		this.setState({ items, isLoading: false })
	}

	componentDidMount = async () => {
		/* const query =  */ this.makeQuery({
			sortBy: "createdAt",
			sortDirection: "desc"
		})
		// this.getItems(query)
	}

	render() {
		const { items, isLoading, isFiltering, isRefreshing } = this.state

		// get current page from props
		const currentPage = this.props.match.params.page || 1

		return (
			<CenteredLayout>
				<div className={styles.mainContainer}>
					<div className={styles.sidebar}>
						<FilterForm onSubmit={this.filterItems} isLoading={isFiltering} />
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
