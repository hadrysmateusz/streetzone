import React from "react"
import { connectRefinementList, Configure } from "react-instantsearch-dom"
import {
	FilterItem,
	FilterMenu,
	FilterContainer,
	SearchBox,
	FilterItemsContainer,
	OptionsContainer
} from "./StyledComponents"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Overlay from "../Overlay"
import { More } from "../Basics"

class AlgoliaRefinementList extends React.Component {
	state = { isMenuOpen: false, inputValue: "" }
	delay = 350

	toggleMenu = () => this.setState((state) => ({ isMenuOpen: !state.isMenuOpen }))

	onChange = (e) => {
		// get the currentTarget from the synthetic event before its inaccessible
		const currentTarget = e.currentTarget
		// update the internal state
		this.setState({ inputValue: currentTarget.value })

		// the timeout makes it so the query only gets updated when you stop typing
		clearTimeout(this.rateLimitedRefine)
		this.rateLimitedRefine = setTimeout(() => {
			this.props.searchForItems(currentTarget.value)
		}, this.delay)
	}

	clearField = () => {
		this.setState({ inputValue: "" })

		this.props.searchForItems("")
	}
	render() {
		const { items, refine, attribute, searchable, multiColumn } = this.props
		return (
			<FilterContainer>
				<OptionsContainer multiColumn={multiColumn}>
					{items.slice(0, 4).map((item) => {
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
									<span>{item.label}</span>
								</label>
							</FilterItem>
						)
					})}
					{searchable && <More onClick={this.toggleMenu}>Więcej...</More>}
				</OptionsContainer>
				{this.state.isMenuOpen && (
					<>
						<Overlay onClick={this.toggleMenu} />
						<FilterMenu>
							<SearchBox>
								<div className="icon-container">
									<FontAwesomeIcon icon="search" />
								</div>
								<input
									type="text"
									onChange={this.onChange}
									value={this.state.inputValue}
									placeholder="Szukaj po nazwie, marce, kategorii itd."
								/>
								{this.state.inputValue && (
									<div className="icon-container" onClick={this.clearField}>
										<FontAwesomeIcon icon="times" />
									</div>
								)}
							</SearchBox>
							<FilterItemsContainer>
								{items.map((item) => {
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
												<span>{item.label}</span>
											</label>
										</FilterItem>
									)
								})}
							</FilterItemsContainer>
						</FilterMenu>
					</>
				)}
			</FilterContainer>
		)
	}
}

export default connectRefinementList(AlgoliaRefinementList)
