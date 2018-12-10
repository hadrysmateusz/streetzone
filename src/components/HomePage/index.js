import React, { Component } from "react"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { Link } from "react-router-dom"
// import cn from "classnames"

import { withFirebase } from "../Firebase"
import ItemCard from "../ItemCard"
import CenteredLayout from "../CenteredLayout"
import LoadingSpinner from "../LoadingSpinner"
import FilterForm from "../Filters"
// import LoaderButton from "../LoaderButton"

import styles from "./Home.module.scss"
// import animations from "../../scss/animations.module.scss"
import { CONST } from "../../constants"

const INITIAL_STATE = {
	items: [],
	isLoading: true,
	isRefreshing: false,
	isFiltering: false,
	cursor: null,
	noMoreItems: false,
	filterData: {
		sortBy: "createdAt",
		sortDirection: "desc"
	}
}

class HomePage extends Component {
	state = INITIAL_STATE

	filterItems = async (values) => {
		// Reset the cursor when changing the filters
		await this.setState({
			isFiltering: true,
			cursor: null,
			items: [],
			noMoreItems: false
		})

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

		await this.setState({ filterData })
		await this.getItems()
		return this.setState({ isFiltering: false })
	}

	getItems = async () => {
		try {
			const { sortBy, sortDirection, filters = {} } = this.state.filterData

			// Create the base query
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
			}

			query = query.orderBy(sortBy, sortDirection)

			const cursor = this.state.cursor

			if (cursor) {
				query = query.startAfter(cursor)
			}

			query = query.limit(CONST.ITEMS_PER_PAGE)

			// execute the query and add itemIds
			const snapshot = await query.get()
			let items = snapshot.docs.map((doc) => ({
				...doc.data(),
				itemId: doc.id
			}))

			// If there weren't any items returned, return early and set noMoreItems flag
			if (items.length === 0) {
				return this.setState({ isLoading: false, noMoreItems: true })
			}

			// If there were less items found than the limit, set noMoreItems flag
			if (items.length < CONST.ITEMS_PER_PAGE) {
				this.setState({ noMoreItems: true })
			}

			if (this.state.items && this.state.items.length > 0) {
				items = this.state.items.concat(items)
			}

			// Get last fetched document and set it as new cursor
			const newCursor = snapshot.docs[snapshot.docs.length - 1]

			return this.setState({ items, cursor: newCursor, isLoading: false })
		} catch (e) {
			console.log(e)
		}
	}

	// refresh = async () => {
	// 	// TODO: make this trigger refresh on all Item cards as well
	// 	await this.setState({ isRefreshing: true })
	// 	await this.getItems()
	// 	return this.setState({ isRefreshing: false })
	// }

	componentDidMount = async () => {
		this.getItems()
	}

	render() {
		const {
			items,
			isLoading,
			isFiltering,
			isRefreshing,
			noMoreItems
		} = this.state

		// get current page from props
		// const currentPage = this.props.match.params.page || 1

		return (
			<CenteredLayout>
				<div className={styles.mainContainer}>
					<div className={styles.sidebar}>
						<FilterForm onSubmit={this.filterItems} isLoading={isFiltering} />
					</div>
					<div className={styles.content}>
						{!isLoading ? (
							<>
								<div className={styles.itemsContainer}>
									{items.map((item, i) => {
										return <ItemCard key={i} item={item} />
									})}
								</div>
								{!noMoreItems && (
									<div className={styles.loadMore} onClick={this.getItems}>
										Więcej
									</div>
								)}
							</>
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
