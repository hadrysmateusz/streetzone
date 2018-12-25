import React, { Component } from "react"
import styled from "styled-components"

import { withFirebase } from "../Firebase"
import ItemsView from "../ItemsView"
import FilterForm from "../Filters"
import { BREAKPOINTS } from "../../constants/const"

const getItemsPerPage = () => {
	const height = window.innerHeight
	const width = window.innerWidth

	let rows = Math.floor(height / 333)
	let cols = 1

	if (width < BREAKPOINTS[1]) {
		cols = 1
	} else if (width < BREAKPOINTS[3]) {
		cols = 2
	} else if (width < BREAKPOINTS[5]) {
		cols = 3
	} else if (width >= BREAKPOINTS[5]) {
		cols = 4
	}
	return Math.max(3, rows * cols)
}

// #region styled-components

const MainGrid = styled.div`
	display: grid;
	margin: 0 auto;
	padding: 0 20px;
	grid-gap: 20px;
	grid-template-areas:
		"filters"
		"content"
		"load-more";

	@media (min-width: ${BREAKPOINTS[2]}px) {
		max-width: 860px;
		grid-template-columns: 200px 1fr;
		grid-template-areas:
			"filters content"
			"filters load-more";
	}
	@media (min-width: ${BREAKPOINTS[3]}px) {
		min-width: ${BREAKPOINTS[3]}px;
	}
	@media (min-width: ${BREAKPOINTS[5]}px) {
		min-width: ${BREAKPOINTS[5]}px;
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

// #endregion

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

	updateURL = (values) => {
		const searchParams = new URLSearchParams()

		if (values.sort) searchParams.set("sort", values.sort)
		if (values.category) searchParams.set("category", values.category)
		if (values.designer) searchParams.set("designer", values.designer)
		if (values.price_min) searchParams.set("price_min", values.price_min)
		if (values.price_max) searchParams.set("price_max", values.price_max)

		this.props.history.push(`?${searchParams.toString()}`)
	}

	clearFilterForm = (form) => {
		console.log("resetting form...")
		form.initialize({ sort: "createdAt-desc" })
		const fields = form.getRegisteredFields()
		form.batch(() => {
			for (let field of fields) {
				if (field === "sort") {
					form.change(field, "createdAt-desc")
				} else {
					form.change(field, undefined)
				}
			}
		})
		// this.props.history.push("?")
	}

	filterItems = async (searchString) => {
		// Reset the cursor when changing the filters
		this.setState({
			isFiltering: true,
			cursor: null,
			items: [],
			noMoreItems: false
		})

		const searchParams = new URLSearchParams(searchString)

		const sortParams = searchParams.get("sort")

		// Get sorting from url or fallback to default of Newest
		const [sortBy, sortDirection] = sortParams
			? sortParams.split("-")
			: ["createdAt", "desc"]

		// Create new object as to not overwrite the FilterForm data
		let filters = {}

		if (searchParams.get("category")) filters.category = searchParams.get("category")
		if (searchParams.get("designer")) filters.designer = searchParams.get("designer")
		if (searchParams.get("price_min")) filters.price_min = searchParams.get("price_min")
		if (searchParams.get("price_max")) filters.price_max = searchParams.get("price_max")

		let filterData = {
			sortBy,
			sortDirection,
			filters
		}

		console.log(filterData)

		await this.setState({ filterData })
		this.getItems()
	}

	getItems = async () => {
		console.log("getting more...")
		const t1 = Date.now()
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
			query = query.limit(getItemsPerPage())

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
			if (items.length < getItemsPerPage()) {
				this.setState({ noMoreItems: true })
			}

			// If there are old items add the new items to them
			if (this.state.items && this.state.items.length > 0) {
				items = this.state.items.concat(items)
			}

			// Get last fetched document and set it as the new cursor
			const newCursor = snapshot.docs[snapshot.docs.length - 1]

			console.log(`took: ${Date.now() - t1}ms`)
			return this.setState({ items, cursor: newCursor, isLoading: false })
		} catch (e) {
			console.log(e)
		}
	}

	componentDidMount = () => {
		// filter items based on data from url
		this.filterItems(this.props.location.search)

		// populate form with data from url
		const searchParams = new URLSearchParams(this.props.location.search)

		let initialValues = {}
		// created at defaults to Newest
		initialValues.sort = searchParams.get("sort")
			? searchParams.get("sort")
			: "createdAt-desc"
		if (searchParams.get("category"))
			initialValues.category = searchParams.get("category")
		if (searchParams.get("designer"))
			initialValues.designer = searchParams.get("designer")
		if (searchParams.get("price_min"))
			initialValues.price_min = searchParams.get("price_min")
		if (searchParams.get("price_max"))
			initialValues.price_max = searchParams.get("price_max")
		console.log("initialValues", initialValues)
		this.setState({ initialValues })

		this.removeLocationListener = this.props.history.listen((location) => {
			this.filterItems(location.search)
		})
	}

	componentWillUnmount = () => {
		this.removeLocationListener()
	}

	render() {
		console.log("rendering...")
		const { items, isLoading, initialValues, noMoreItems } = this.state
		return (
			<MainGrid>
				<Filters>
					<FilterForm
						onSubmit={this.updateURL}
						onReset={this.clearFilterForm}
						initialValues={initialValues}
					/>
				</Filters>
				<Content>
					<ItemsView isLoading={isLoading} items={items} />
				</Content>
				{!noMoreItems && !isLoading && (
					<LoadMore onClick={this.getItems}>Więcej</LoadMore>
				)}
			</MainGrid>
		)
	}
}

export default withFirebase(HomePage)
