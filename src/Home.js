import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import API from "@aws-amplify/api"
import cn from "classnames"
import errorLog from "./libs/errorLog"

import ItemCard from "./ItemCard"
import CenteredLayout from "./CenteredLayout"
import LoadingSpinner from "./components/LoadingSpinner"
import FilterForm from "./FilterForm"
import LoaderButton from "./components/LoaderButton"

import styles from "./Home.module.scss"
import animations from "./scss/animations.module.scss"
import { DEFAULT_PAGINATION_ITEMS_PER_PAGE } from "./const"

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items: null,
			isLoading: true,
			isRefreshing: false,
			itemsPerPage: DEFAULT_PAGINATION_ITEMS_PER_PAGE,
			lastEvaluatedKey: null
		}

		// Create default cursor
		this.state.cursor = {
			itemsPerPage: this.state.itemsPerPage,
			sortBy: "date",
			sortDirection: "DESC",
			filter: {}
		}
	}

	refresh = async () => {
		// TODO: make this trigger refresh on all Item cards as well
		await this.setState({ isRefreshing: true })

		await this.getItems()
		await this.setState({ isRefreshing: false })
	}

	getMoreItems = async () => {
		console.log("Getting more")
		let res = this.getItems({
			...this.state.cursor,
			lastEvaluatedKey: this.state.lastEvaluatedKey
		})
	}

	filterItems = async (data) => {
		try {
			this.setState({ lastEvaluatedKey: null })
			const [sortBy = "date", sortDirection = "DESC"] = data.sort.split("-")

			// Create new object as to not overwrite the FilterForm data
			let dataToSend = {
				itemsPerPage: this.state.itemsPerPage,
				sortBy: sortBy,
				sortDirection: sortDirection,
				filter: {
					category: data.category,
					designers: data.designers ? [...data.designers] : [],
					price_min: data.price_min,
					price_max: data.price_max
				}
			}

			console.log("Data To Send", dataToSend)

			await this.getItems(dataToSend)
		} catch (e) {
			errorLog(e, "Server error")
		}
	}

	getItems = async (cursor) => {
		this.setState({ isLoading: true })
		try {
			const init = {
				body: {
					cursor
				}
			}
			console.log("Request", cursor)
			const res = await API.post("items", "/items/query", init)
			const items = res.Items
			const lastEvaluatedKey = res.LastEvaluatedKey
			this.setState({ items, lastEvaluatedKey, isLoading: false })
			console.log("Response", res)
			return res
		} catch (e) {
			this.setState({ isLoading: false })
			errorLog(e, "Database connection error")
		}
	}

	onSubmit = async (data) => {
		console.log("Filtering...")
		const res = await this.filterItems(data)
	}

	componentDidMount = async () => {
		await this.getItems(this.state.cursor)
		await this.setState({ isLoading: false })
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
						<FilterForm
							onSubmit={this.onSubmit}
							pagination={{ currentPage, itemsPerPage }}
							items={items}
						/>
						<LoaderButton
							onClick={this.getMoreItems}
							isLoading={this.state.isLoading}
							text="Więcej"
							disabled={this.state.isLoading}
						/>
					</div>
					<div className={styles.content}>
						{!isLoading && items ? (
							items /* .slice(start, end) */
								.map((item) => {
									return (
										<ItemCard key={item.userId + item.createdAt} item={item} />
									)
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

export default Home
