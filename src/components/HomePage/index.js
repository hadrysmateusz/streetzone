import React, { Component } from "react"
import styled from "styled-components"
import {
	InstantSearch,
	InfiniteHits,
	SearchBox,
	Highlight,
	RefinementList,
	Pagination,
	MenuSelect,
	RangeInput,
	SortBy,
	Configure,
	CurrentRefinements,
	ClearRefinements
} from "react-instantsearch-dom"

import { AlgoliaItemCard } from "../ItemCard"
import { withFirebase } from "../Firebase"
import { StyledFieldCommon, Separator } from "../Basics"
import { THEME, ITEM_SCHEMA } from "../../constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const getItemsPerPage = () => {
	const height = window.innerHeight
	const width = window.innerWidth

	let rows = Math.floor(height / 333)
	let cols = 1

	if (width < THEME.breakpoints[1]) {
		cols = 1
	} else if (width < THEME.breakpoints[3]) {
		cols = 2
	} else if (width < THEME.breakpoints[5]) {
		cols = 3
	} else if (width >= THEME.breakpoints[5]) {
		cols = 4
	}
	return Math.max(3, Math.min(16, rows * cols))
}

const MainGrid = styled.div`
	display: grid;
	margin: 0 auto;
	padding: 0 20px;
	grid-template-areas:
		"topbar"
		"filters"
		"content";

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		max-width: 850px;
		grid-template-columns: min-content 1fr;
		grid-template-areas:
			"topbar topbar"
			"filters content";
	}
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		max-width: ${(p) => p.theme.breakpoints[3]}px;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[5]}px) {
		max-width: ${(p) => p.theme.breakpoints[5]}px;
	}
`

const StyledInfiniteHits = styled(InfiniteHits)`
	.ais-InfiniteHits-list {
		list-style-type: none;
		padding: 0;

		display: grid;
		grid-gap: 10px;

		@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
			grid-template-columns: 1fr 1fr;
		}
		@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
			grid-template-columns: 1fr 1fr;
		}
		@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
			grid-template-columns: 1fr 1fr 1fr;
		}
		@media (min-width: ${(p) => p.theme.breakpoints[5]}px) {
			grid-template-columns: 1fr 1fr 1fr 1fr;
		}
	}
`

const StyledSortBy = styled(SortBy)``

const StyledRefinementList = styled(RefinementList)`
	min-width: 200px;
	.ais-RefinementList-list {
		list-style: none;
		padding: 0;
	}

	.ais-SearchBox {
		flex: 1 1 100%;
		width: 100%;
		outline: none;
		:focus,
		:active {
			outline: none !important;
		}
	}
	.ais-SearchBox-form {
		display: flex;
		outline: none;
		:focus,
		:active {
			outline: none !important;
		}
	}

	.ais-SearchBox-input {
		min-width: 0;
		${StyledFieldCommon}
		flex: 1 1 0;
		padding: 0 14px;
		border-right: none;
		height: 38px;
		outline: none;
		border-radius: 3px 0 0 3px;
		:focus,
		:active {
			outline: none !important;
		}
	}
	.ais-SearchBox-submit {
		border: 1px solid ${(p) => p.theme.colors.gray[50]};
		width: 38px;
		border-radius: 0 3px 3px 0;
		padding: 0;
		svg {
			width: 12px;
			height: 12px;
		}
		background: ${(p) => p.theme.colors.gray[100]};
		cursor: pointer;
	}
`

const Topbar = styled.div`
	grid-area: topbar;
	display: flex;
	.ais-SearchBox {
		flex: 1 1 100%;
		width: 100%;
		outline: none;
		:focus,
		:active {
			outline: none !important;
		}
	}
	.ais-SearchBox-form {
		display: flex;
		outline: none;
		:focus,
		:active {
			outline: none !important;
		}
	}
	.ais-SearchBox-input {
		${StyledFieldCommon}
		min-width: 0;
		flex: 1 1 0;
		padding: 0 14px;
		border-radius: 20px 0 0 20px;
		border-right: none;
		height: 40px;
		outline: none;
		:focus,
		:active {
			outline: none !important;
		}
	}
	.ais-SearchBox-submitIcon path {
		fill: white;
	}
	.ais-SearchBox-submit {
		border-radius: 0 20px 20px 0;
		border: none;
		width: 40px;
		@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
			width: 80px;
		}
		background: ${(p) => p.theme.colors.accent};
		cursor: pointer;
		svg {
			width: 13px;
			height: 13px;
		}
	}

	.ais-SortBy {
		flex: 1 1 200px;
		width: auto;
		min-width: 0;
		margin-left: 10px;
	}

	.ais-SortBy-select {
		${StyledFieldCommon}
		background: white;
		padding: 0 14px;
		height: 40px;
		min-width: 0;
		border-radius: 20px;
	}
	.ais-SortBy-option {
		padding: 0 14px;
	}
`

const FiltersToggle = styled.div`
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	border-radius: 20px;
	height: 40px;
	color: ${(p) => p.theme.colors.gray[50]};
	margin-right: 10px;
	flex: 0 0 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`

const Content = styled.div`
	grid-area: content;
`

const SizeRefinementList = styled(StyledRefinementList)`
	.ais-RefinementList-list {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
	.ais-RefinementList-count {
		display: none;
	}
`

const Filters = styled.div`
	grid-area: filters;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		margin-right: 20px;
	}

	&.hidden {
		display: none;
	}
	.ais-RefinementList-labelText {
		color: ${(p) => p.theme.colors.black[75]};
		text-transform: uppercase;
		padding: 0 4px 0 8px;
		font-size: 0.84rem;
	}
	.ais-RefinementList-count {
		background: ${(p) => p.theme.colors.gray[100]};
		border-radius: 4px;
		padding: 0 3px;
		font-size: 0.76rem;
	}
	.ais-RefinementList-item {
		margin: 3px 0;
	}

	.ais-CurrentRefinements-item {
		display: flex;
		flex-flow: row wrap;
		background: ${(p) => p.theme.colors.gray[100]};
		border: 1px solid ${(p) => p.theme.colors.gray[50]};
	}

	.ais-CurrentRefinements-label {
	}

	.ais-CurrentRefinements-list {
		list-style: none;
		padding: 0;
	}
	.ais-CurrentRefinements-category {
		display: flex;
		margin: 2px 0;
	}
	.ais-CurrentRefinements-categoryLabel {
	}
	.ais-CurrentRefinements-delete {
	}

	.ais-RangeInput-form {
		display: flex;
	}
	.ais-RangeInput-separator {
		display: none;
	}

	.ais-RangeInput-submit {
		background: ${(p) => p.theme.colors.gray[100]};
		color: ${(p) => p.theme.colors.black[75]};
		text-transform: uppercase;
		font-size: 0.84rem;
		border-radius: 3px;
		border: 1px solid ${(p) => p.theme.colors.gray[50]};
	}

	.ais-RangeInput-input {
		${StyledFieldCommon}
		width: 100%;
		font-size: 1rem;
		min-width: 0;
		min-height: 36px;
		padding-left: 10px;
		line-height: 100%;
		border-radius: 3px;
		margin-right: 6px;

		border: 1px solid ${(p) => p.theme.colors.gray[50]};
		color: ${(p) => p.theme.colors.black[75]};

		&::placeholder {
			color: #808080;
		}

		&:not([disabled]) {
			&:focus {
				border: 1px solid ${(p) => p.theme.colors.accent};
				outline: 1px solid ${(p) => p.theme.colors.accent};
			}
			&:not(:focus) {
				&:hover {
					border-color: #adadad;
				}
			}
		}

		-moz-appearance: textfield;

		:hover,
		:focus {
			-moz-appearance: number-input;
		}
	}

	.ais-MenuSelect-select {
		${StyledFieldCommon}
		background: white;
		padding: 0 10px;
		height: 36px;
		min-width: 0;
		border-radius: 3px;
	}
	.ais-MenuSelect-option {
		padding: 0 14px;
	}

	.ais-ClearRefinements-button {
		width: 100%;
		margin-top: 16px;
		height: 36px;
		border-radius: 3px;
		background: white;
		border: 1px solid ${(p) => p.theme.colors.gray[50]};
		color: ${(p) => p.theme.colors.black[75]};
		cursor: pointer;
	}
`

class HomePage extends Component {
	// #region component internals
	state = {
		items: [],
		isLoading: true,
		isFetching: false,
		cursor: null,
		noMoreItems: false,
		filterData: {
			sortBy: "createdAt",
			sortDirection: "desc"
		}
	}

	filtersRef = React.createRef()

	updateURL = (values) => {
		const searchParams = new URLSearchParams()

		if (values.sort) searchParams.set("sort", values.sort)
		if (values.category) searchParams.set("category", values.category)
		if (values.size) searchParams.set("size", values.size)
		if (values.designer) searchParams.set("designer", values.designer)
		if (values.price_min) searchParams.set("price_min", values.price_min)
		if (values.price_max) searchParams.set("price_max", values.price_max)

		this.props.history.push(`?${searchParams.toString()}`)
	}

	clearFilterForm = (form) => {
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
		this.props.history.push("?")
	}

	filterItems = async (searchString) => {
		// Reset the cursor when changing the filters
		this.setState({
			isFetching: true,
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
		if (searchParams.get("size")) filters.size = searchParams.get("size")
		if (searchParams.get("designer")) filters.designer = searchParams.get("designer")
		if (searchParams.get("price_min")) filters.price_min = searchParams.get("price_min")
		if (searchParams.get("price_max")) filters.price_max = searchParams.get("price_max")

		let filterData = {
			sortBy,
			sortDirection,
			filters
		}

		await this.setState({ filterData })
		this.getItems()
	}

	getItems = async () => {
		try {
			console.log("gettingItems:", this.state.filterData)
			const { sortBy, sortDirection, filters = {} } = this.state.filterData

			// Create the base query
			let query = this.props.firebase.items()

			// Find only available items
			query = query.where("status", "==", ITEM_SCHEMA.status.available)

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
				return this.setState({ isLoading: false, isFetching: false, noMoreItems: true })
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

			return this.setState({
				items,
				cursor: newCursor,
				isLoading: false,
				isFetching: false
			})
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
		this.setState({ initialValues })

		this.removeLocationListener = this.props.history.listen((location) => {
			this.filterItems(location.search)
		})
	}

	componentWillUnmount = () => {
		this.removeLocationListener()
	}
	// #endregion
	render() {
		const { items, isLoading, initialValues, noMoreItems } = this.state
		return (
			<InstantSearch
				appId="ESTLFV2FMH"
				apiKey="a112a10276d1d2919b9207df6d9bbccf"
				indexName="dev_items"
			>
				<Configure hitsPerPage={getItemsPerPage()} />
				<MainGrid>
					<Topbar>
						<FiltersToggle
							onClick={() => this.filtersRef.current.classList.toggle("hidden")}
						>
							<FontAwesomeIcon icon="filter" />
						</FiltersToggle>
						<SearchBox />
						<StyledSortBy
							defaultRefinement="dev_items"
							items={[
								{
									value: "dev_items",
									label: "Proponowane"
								},
								{
									value: "dev_items_createdAt_desc",
									label: "Najnowsze"
								},
								{
									value: "dev_items_price_asc",
									label: "Cena rosnąco"
								}
							]}
						/>
					</Topbar>
					<Filters ref={this.filtersRef}>
						<ClearRefinements />
						{/* <CurrentRefinements /> */}
						<Separator text="Projektanci" />
						<StyledRefinementList attribute="designers" searchable />
						<Separator text="Kategoria" />
						<StyledRefinementList attribute="category" searchable />
						<Separator text="Rozmiar" />
						<SizeRefinementList attribute="size" />
						<Separator text="Cena" />
						<RangeInput attribute="price" min={0} />
						<Separator text="Stan" />
						<MenuSelect attribute="condition" />
					</Filters>
					<Content>
						<StyledInfiniteHits hitComponent={AlgoliaItemCard} />
					</Content>
				</MainGrid>
			</InstantSearch>
		)
	}
}

export default withFirebase(HomePage)
