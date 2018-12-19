import React, { Component } from "react"
import styled from "styled-components"
import { Grid, GridItem } from "styled-grid-component"

import { withFirebase } from "../Firebase"
import ItemCard from "../ItemCard"
import LoadingSpinner from "../LoadingSpinner"
import FilterForm from "../Filters"
import { CONST } from "../../constants"

// #region Styled Components

const Container = styled.div`
	display: flex;
	flex-flow: column;
	max-width: 650px;
	@media (min-width: 800px) {
		flex-flow: row;
		max-width: 1100px;
	}
	justify-content: center;
	margin: 0 auto;
`

const Sidebar = styled.aside`
	min-width: 212px;
	padding-bottom: 30px;
	// padding: $item-spacing 0;
	width: 100%;
	@media (min-width: 800px) {
		width: 200px;
		min-width: 190px;
		padding: $item-spacing;
		margin-right: $item-spacing * 2;
	}
`

const MainContent = styled.main`
	width: auto;
	min-width: 60%;
`

const ItemsContainer = styled.div`
	width: auto;
	display: flex;
	flex-flow: row wrap;
	justify-content: left;
	align-content: flex-start;
	margin-top: -$item-spacing;
	@media (min-width: 600px) {
		max-width: 670px;
		margin: -$item-spacing;
	}
	@media (min-width: 800px) {
		max-width: 670px;
	}
	@media (min-width: 1100px) {
		max-width: 820px;
	}
`

const LoadMore = styled.div`
	text-align: center;
	font-size: 1.2rem;
	font-weight: bold;
	padding: 30px 0 30px 0;
	cursor: pointer;
	margin: 10px 10px 20px 10px;
`

//  #endregion

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

	render() {
		const { items, isLoading, isFiltering, noMoreItems } = this.state
		return (
			<Grid
				width="100%"
				style={{ maxWidth: "1100px", margin: "0 auto" }}
				templateColumns="200px auto"
				gap="20px"
				autoRows="minmax(100px, auto)"
			>
				<GridItem column="1/2" row="1">
					<FilterForm onSubmit={this.filterItems} isLoading={isFiltering} />
				</GridItem>
				<GridItem column="2/3" row="1">
					{!isLoading && (
						<Grid width="100%" templateColumns="repeat(3,1fr)" gap="10px" autoRows="auto">
							{items.map((item, i) => (
								<GridItem style={{ minWidth: 0 }}>
									<ItemCard key={i} item={item} />
								</GridItem>
							))}
						</Grid>
					)}
				</GridItem>
				<GridItem column="2/3" row="2">
					{!noMoreItems && <LoadMore onClick={this.getItems}>Więcej</LoadMore>}
				</GridItem>
			</Grid>
		)
	}
}

export default withFirebase(HomePage)
