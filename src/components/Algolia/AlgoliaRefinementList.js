import React from "react"
import { connectRefinementList } from "react-instantsearch-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Portal } from "react-portal"

import {
	FilterItem,
	FilterMenu,
	SearchBox as SearchBoxContainer,
	FilterItemsContainer,
	OptionsContainer,
	NoResults
} from "./StyledComponents"
import Overlay from "../Overlay"
import { More } from "../Basics"

const FilterItems = ({ items, refine, showCount }) => {
	return items && items.length > 0 ? (
		items.map((item) => {
			return (
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
						<span>{item.label}</span> {showCount && <em>({item.count})</em>}
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
		const { items, refine, searchable, multiColumn, show } = this.props
		const limitedItems = show ? items.slice(0, show) : items

		return (
			<>
				<OptionsContainer multiColumn={multiColumn}>
					<FilterItems items={limitedItems} refine={refine} />
				</OptionsContainer>
				{searchable && items && items.length > 0 && (
					<More onClick={this.toggleMenu}>Więcej...</More>
				)}
				{this.state.isMenuOpen && (
					<>
						<Portal node={document && document.getElementById("filters-container")}>
							<Overlay onClick={this.toggleMenu} />
							<FilterMenu>
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
						</Portal>
					</>
				)}
			</>
		)
	}
}

export default connectRefinementList(AlgoliaRefinementList)
