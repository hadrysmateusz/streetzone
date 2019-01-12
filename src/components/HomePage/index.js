import React, { Component } from "react"
import styled, { css } from "styled-components"
import {
	InstantSearch,
	InfiniteHits,
	SearchBox,
	RefinementList,
	RangeInput,
	Configure
} from "react-instantsearch-dom"

import { AlgoliaItemCard } from "../ItemCard"
import { withFirebase } from "../Firebase"
import { THEME } from "../../constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Foldable from "../Foldable"
import AlgoliaSortBy from "../Algolia/AlgoliaSortBy"

const sortingOptions = [
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
]

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

const InputCommon = css`
	color: ${(p) => p.theme.colors.black[75]};
	border: 1px solid ${(p) => p.theme.colors.gray[50]};
	:hover {
		border: 1px solid ${(p) => p.theme.colors.gray[25]};
	}
	background: white;
	padding: 0 14px;
	height: 38px;
	min-width: 0;
`

const MainGrid = styled.div`
	position: relative;
	display: grid;
	margin: 20px auto 0;
	box-sizing: content-box;
	padding: 0 10px;
	row-gap: 20px;
	grid-template-areas:
		"filters"
		"content";
	grid-template-columns: 100%;

	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		padding: 0 20px;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		max-width: 850px;

		grid-template-columns: min-content 1fr;
		grid-template-areas: "filters content";
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
		margin: 0;

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

const StyledRefinementList = styled(RefinementList)`
	.ais-RefinementList-list {
		list-style: none;
		padding: 0;
		margin: 6px 0;
	}
	.ais-RefinementList-searchBox {
		width: 100%;
	}
	.ais-SearchBox-form {
		display: flex;
	}
	.ais-SearchBox-input {
		${InputCommon}
		height: 34px;
		flex: 1 1;
	}
	.ais-SearchBox-submit {
		border: 1px solid ${(p) => p.theme.colors.gray[50]};
		background: ${(p) => p.theme.colors.gray[100]};
		width: 38px;
		padding: 0;
		border-left: 0;
		svg {
			width: 12px;
			height: 12px;
		}
		cursor: pointer;
	}
`

const TopbarInnerContainer = styled.div`
	max-width: ${(p) => p.theme.breakpoints[5]}px;
	margin: 0 auto;

	display: grid;
	gap: 10px;

	grid-template-columns: auto 1fr auto;
	grid-template-areas: "sidebar-toggle search sort";

	.ais-SearchBox {
		grid-area: search;
		outline: none;
		min-width: 0;
		* {
			min-width: 0;
		}
	}
	.ais-SearchBox-form {
		display: flex;
		min-width: 0;
	}
	.ais-SearchBox-input {
		${InputCommon}
		flex: 1 1 100%;
		min-width: 0;
		padding: 0 12px;
		height: 34px;
		font-size: 0.92rem;
		/* border-radius: 20px 0 0 20px; */
		/* border-radius: 20px; */
	}
	.ais-SearchBox-submitIcon path {
		fill: white;
	}
	.ais-SearchBox-submit {
		display: none;
	}

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		max-width: 850px;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		max-width: ${(p) => p.theme.breakpoints[3]}px;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[5]}px) {
		max-width: ${(p) => p.theme.breakpoints[5]}px;
	}
`

const Topbar = styled.div`
	border-top: 1px solid;
	border-bottom: 1px solid;
	border-color: ${(p) => p.theme.colors.gray[75]};
	position: sticky;
	z-index: 9800;
	top: 50px;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		top: 44px;
	}
	padding: 13px 10px;
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		padding: 13px 20px;
	}
	background: white;
	grid-area: topbar;

	box-sizing: content-box;
`

const FiltersToggle = styled.div`
	${InputCommon}
	grid-area: sidebar-toggle;
	padding: 0 14px;
	height: 38px;
	color: ${(p) => p.theme.colors.black[100]};
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	svg {
		margin-right: 5px;
	}

	padding: 0 12px;
	height: 34px;
	font-size: 0.92rem;
`

const Content = styled.main`
	grid-area: content;
`

const SizeRefinementList = styled(StyledRefinementList)`
	.ais-RefinementList-list {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
	.ais-RefinementList-count {
		display: none;
	}
`

const SidebarInner = styled.div`
	position: sticky;
	top: 127px;
	background: white;
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	padding: 10px 20px;
`

const Sidebar = styled.aside`
	grid-area: filters;
	max-width: 100%;

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		width: 220px;
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
		padding: 0 4px;
		font-size: 0.76rem;
	}
	.ais-RefinementList-item {
		padding: 3px 6px;
	}
	.ais-RefinementList-label {
		display: flex;
		align-items: center;
	}

	.ais-RangeInput {
		min-width: 0;
		width: 100%;
	}

	.ais-RangeInput-form {
		display: flex;
		min-width: 0;
	}
	.ais-RangeInput-separator {
		display: none;
	}
	.ais-RangeInput-submit {
		background: ${(p) => p.theme.colors.gray[100]};
		color: ${(p) => p.theme.colors.black[75]};
		flex: 0 0 38px;
		text-transform: uppercase;
		font-size: 0.84rem;
		border: 1px solid ${(p) => p.theme.colors.gray[50]};
	}
	.ais-RangeInput-input {
		${InputCommon}
		padding: 0 4px 0 8px;
		margin-right: 6px;
		flex: 1 1 0;
		color: ${(p) => p.theme.colors.black[75]};
		&::placeholder {
			color: ${(p) => p.theme.colors.gray[50]};
		}

		-moz-appearance: textfield;
		:hover,
		:focus {
			-moz-appearance: number-input;
		}
	}

	.ais-MenuSelect-select {
		${InputCommon}
		border-radius: 3px;
		width: 100%;
	}

	.ais-ClearRefinements-button {
		width: 100%;
		margin-top: 16px;
		height: 38px;
		border-radius: 3px;
		background: white;
		border: 1px solid ${(p) => p.theme.colors.gray[50]};
		color: ${(p) => p.theme.colors.black[75]};
		cursor: pointer;
	}
`

class HomePage extends Component {
	state = {
		noMoreItems: false
	}

	filtersRef = React.createRef()

	render() {
		return (
			<InstantSearch
				appId="ESTLFV2FMH"
				apiKey="a112a10276d1d2919b9207df6d9bbccf"
				indexName="dev_items"
			>
				<Configure hitsPerPage={getItemsPerPage()} />

				<Topbar>
					<TopbarInnerContainer>
						<FiltersToggle
							onClick={() => this.filtersRef.current.classList.toggle("hidden")}
						>
							<FontAwesomeIcon icon="filter" />
							<span>Filtry</span>
						</FiltersToggle>
						<SearchBox />
						<AlgoliaSortBy options={sortingOptions} />
					</TopbarInnerContainer>
				</Topbar>
				<MainGrid>
					<Sidebar ref={this.filtersRef}>
						<SidebarInner>
							<Foldable title="Kategoria">
								<StyledRefinementList attribute="category" />
							</Foldable>
							<Foldable title="Projektanci">
								<StyledRefinementList attribute="designers" searchable />
							</Foldable>
							<Foldable title="Rozmiar" startFolded>
								<SizeRefinementList attribute="size" />
							</Foldable>
							<Foldable title="Cena" startFolded>
								<RangeInput attribute="price" min={0} />
							</Foldable>
						</SidebarInner>
					</Sidebar>
					<Content>
						<StyledInfiniteHits hitComponent={AlgoliaItemCard} />
					</Content>
				</MainGrid>
			</InstantSearch>
		)
	}
}

export default withFirebase(HomePage)
