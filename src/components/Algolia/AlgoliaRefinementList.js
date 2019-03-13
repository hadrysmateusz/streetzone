import React from "react"
import { connectRefinementList } from "react-instantsearch-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { UnstyledButton } from "../Button"

import {
	FilterItem,
	SearchBox as SearchBoxContainer,
	FilterItemsContainer,
	OptionsContainer,
	NoResults,
	BoxItem
} from "./StyledComponents"
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

	toggleMenu = async () => {
		await this.setState((state) => ({ isMenuOpen: !state.isMenuOpen }))
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
			currentBreakpoint,
			boxGrid,
			...rest
		} = this.props
		const { isMenuOpen } = this.state
		const limitedItems = isMenuOpen ? items : show ? items.slice(0, show) : items

		return (
			<AdaptiveFoldable
				{...rest}
				showClear={currentRefinement && currentRefinement.length !== 0}
			>
				{searchable && (
					<SearchBox
						value={this.state.inputValue}
						onChange={this.onInputChange}
						clear={this.clearInput}
					/>
				)}
				{currentBreakpoint < 1 ? (
					<FilterItemsContainer>
						<FilterItems items={items} refine={refine} />
					</FilterItemsContainer>
				) : (
					<OptionsContainer multiColumn={multiColumn} boxGrid={boxGrid}>
						<FilterItems items={limitedItems} refine={refine} boxGrid={boxGrid} />
					</OptionsContainer>
				)}
				{searchable &&
					items &&
					items.length > 0 &&
					(show ? items.length > show : true) &&
					currentBreakpoint > 0 && (
						<UnstyledButton>
							<Text onClick={this.toggleMenu}>
								{isMenuOpen ? (
									<>
										<FontAwesomeIcon icon="minus" size="xs" /> MNIEJ
									</>
								) : (
									<>
										<FontAwesomeIcon icon="plus" size="xs" /> WIĘCEJ
									</>
								)}
							</Text>
						</UnstyledButton>
					)}
			</AdaptiveFoldable>
		)
	}
}

export default compose(
	withBreakpoints,
	connectRefinementList
)(AlgoliaRefinementList)
