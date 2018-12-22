import React, { Component } from "react"
import styled from "styled-components"
import { Box } from "rebass"

import { withFirebase } from "../Firebase"
import ItemCard from "../ItemCard"
import LoadingSpinner from "../LoadingSpinner"
import FilterForm from "../Filters"
import { CONST } from "../../constants"

const MainGrid = styled.div`
	display: grid;
	margin: 0 auto;
	padding: 0 20px;
	grid-gap: 20px;
	grid-template-areas:
		"filters"
		"content"
		"load-more";

	@media (min-width: 750px) {
		max-width: 860px;
		grid-template-columns: 200px 4fr;
		grid-template-areas:
			"filters content"
			"filters load-more";
	}
	@media (min-width: 1050px) {
		max-width: 1050px;
	}
	@media (min-width: 1260px) {
		max-width: 1260px;
	}
`

const Content = styled.div`
	grid-area: content;
`

const Filters = styled.div`
	grid-area: filters;
`

const LoadMore = styled.div`
	grid-area: load-more;
	text-align: center;
	font-size: 1.2rem;
	font-weight: bold;
	padding: 20px 0;
	cursor: pointer;
	margin-bottom: 20px;
`

const ItemsGrid = styled.div`
	display: grid;
	grid-gap: 14px;

	@media (min-width: 570px) {
		grid-template-columns: 1fr 1fr;
	}
	@media (min-width: 750px) {
		grid-template-columns: 1fr 1fr;
	}
	@media (min-width: 1050px) {
		grid-template-columns: 1fr 1fr 1fr;
	}
	@media (min-width: 1260px) {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
`

// #region

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
		console.log(values)

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

			// apply filters
			if (filters) {
				const { category, designer, price_min, price_max } = filters

				if (category) query = query.where("category", "==", category)
				if (designer) query = query.where("designers", "array-contains", designer)
				if (price_min) query = query.where("price", ">=", +price_min)
				if (price_max) query = query.where("price", "<=", +price_max)
				// When using range comparison operators
				// the first sorting has to be by the same property
				if ((price_max || price_min) && sortBy !== "price") {
					query = query.orderBy("price")
				}
			}

			// apply sorting
			query = query.orderBy(sortBy, sortDirection)

			// get the old cursor
			const cursor = this.state.cursor

			// if there was a cursor start after it
			if (cursor) query = query.startAfter(cursor)

			// limit the result set
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

			// If there are old items add the new items to them
			if (this.state.items && this.state.items.length > 0) {
				items = this.state.items.concat(items)
			}

			// Get last fetched document and set it as the new cursor
			const newCursor = snapshot.docs[snapshot.docs.length - 1]

			return this.setState({ items, cursor: newCursor, isLoading: false })
		} catch (e) {
			console.log(e)
		}
	}

	componentDidMount = async () => {
		this.getItems()
	}

	// #endregion
	render() {
		const { items, isLoading, isFiltering, noMoreItems } = this.state
		return (
			<MainGrid>
				<Filters>
					<FilterForm onSubmit={this.filterItems} isLoading={isFiltering} />
				</Filters>
				<Content>
					{!isLoading ? (
						<ItemsGrid>
							{items.map((item, i) => (
								<ItemCard key={i} item={item} />
							))}
						</ItemsGrid>
					) : (
						<LoadingSpinner />
					)}
				</Content>
				{!noMoreItems && !isLoading && (
					<LoadMore onClick={this.getItems}>Więcej</LoadMore>
				)}
			</MainGrid>
		)
	}
}

export default withFirebase(HomePage)
