import React from "react"
import { connectRefinementList } from "react-instantsearch-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Portal } from "react-portal"
import { UnstyledButton } from "../Button"

import {
	FilterItem,
	FilterMenu,
	SearchBox as SearchBoxContainer,
	FilterItemsContainer,
	OptionsContainer,
	NoResults,
	BoxItem
} from "./StyledComponents"
import Overlay from "../Overlay"
import { AdaptiveFoldable } from "../Foldable"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"
import Ratio from "react-ratio/lib/Ratio"
import { Text } from "../StyledComponents"

const FilterItems = ({ items, refine, showCount, boxGrid }) => {
	return items && items.length > 0 ? (
		items.map((item) => {
			return boxGrid ? (
				<Ratio ratio={1}>
					<BoxItem checked={item.isRefined}>
						<label htmlFor={`filter-value-${item.label}`}>
							<input
								id={`filter-value-${item.label}`}
								type="checkbox"
								checked={item.isRefined}
								value={item.value}
								name={item.label}
								onChange={() => refine(item.value)}
								hidden={true}
							/>
							<Text>{item.label}</Text> {showCount && <em>({item.count})</em>}
						</label>
					</BoxItem>
				</Ratio>
			) : (
				<FilterItem key={item.value}>
					<label htmlFor={`filter-value-${item.label}`}>
						<input
							id={`filter-value-${item.label}`}
							type="checkbox"
							checked={item.isRefined}
							value={item.value}
							name={item.label}
							onChange={() => refine(item.value)}
						/>
						<Text>{item.label}</Text> {showCount && <em>({item.count})</em>}
					</label>
				</FilterItem>
			)
		})
	) : (
		<NoResults>Brak</NoResults>
	)
}

const SearchBox = React.forwardRef(({ value, onChange, clear }, ref) => (
	<SearchBoxContainer>
		<div className="icon-container">
			<FontAwesomeIcon icon="search" />
		</div>
		<input type="text" placeholder="Szukaj" onChange={onChange} value={value} ref={ref} />
		{value && (
			<div className="icon-container" onClick={clear}>
				<FontAwesomeIcon icon="times" />
			</div>
		)}
	</SearchBoxContainer>
))

class AlgoliaRefinementList extends React.Component {
	state = { isMenuOpen: false, inputValue: "" }

	searchBox = React.createRef()

	toggleMenu = async () => {
		await this.setState((state) => ({ isMenuOpen: !state.isMenuOpen }))
		// focus the input upon opening the menu
		const isOpen = this.state.isMenuOpen
		if (isOpen) {
			this.searchBox.current.focus()
		}
	}

	onInputChange = (e) => {
		// get the currentTarget from the synthetic event before it's inaccessible
		const currentTarget = e.currentTarget
		// update the internal state
		this.setState({ inputValue: currentTarget.value })
		// trigger algolia's search
		this.props.searchForItems(currentTarget.value)
	}

	clearInput = () => {
		this.setState({ inputValue: "" })
		this.props.searchForItems("")
	}

	render() {
		const {
			items,
			refine,
			searchable,
			multiColumn,
			show,
			currentRefinement,
			attribute,
			tab,
			openTab,
			toggle,
			currentBreakpoint,
			boxGrid
		} = this.props
		const limitedItems = show ? items.slice(0, show) : items

		return (
			<AdaptiveFoldable
				tab={tab}
				openTab={openTab}
				toggle={toggle}
				attribute={attribute}
				showClear={currentRefinement && currentRefinement.length !== 0}
			>
				{searchable && currentBreakpoint < 1 ? (
					<>
						<SearchBox
							value={this.state.inputValue}
							onChange={this.onInputChange}
							clear={this.clearInput}
							ref={this.searchBox}
						/>
						<FilterItemsContainer>
							<FilterItems items={items} refine={refine} />
						</FilterItemsContainer>
					</>
				) : (
					<OptionsContainer multiColumn={multiColumn} boxGrid={boxGrid}>
						<FilterItems items={limitedItems} refine={refine} boxGrid={boxGrid} />
					</OptionsContainer>
				)}
				{searchable && items && items.length > 0 && currentBreakpoint > 0 && (
					<UnstyledButton>
						<Text onClick={this.toggleMenu}>
							<FontAwesomeIcon icon="plus" size="xs" /> WIĘCEJ
						</Text>
					</UnstyledButton>
				)}
				{this.state.isMenuOpen && (
					<>
						<Overlay onClick={this.toggleMenu} />
						<FilterMenu
							onKeyDown={(e) => {
								if (e.key === "Escape") {
									this.toggleMenu()
								}
							}}
						>
							<SearchBox
								value={this.state.inputValue}
								onChange={this.onInputChange}
								clear={this.clearInput}
								ref={this.searchBox}
							/>
							<FilterItemsContainer>
								<FilterItems items={items} refine={refine} showCount />
							</FilterItemsContainer>
						</FilterMenu>
					</>
				)}
			</AdaptiveFoldable>
		)
	}
}

export default compose(
	withBreakpoints,
	connectRefinementList
)(AlgoliaRefinementList)
