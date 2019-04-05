import React from "react"
import { connectRefinementList } from "react-instantsearch-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"

import { UnstyledButton } from "../../Button"
import { AdaptiveFoldable } from "../../Foldable"
import { Text } from "../../StyledComponents"

import SearchBox from "./SearchBox"
import { BoxOptionsList, OptionsList } from "./OptionsList"
import { Box } from "rebass"

export const BasicRefinementList = connectRefinementList(
	({
		items,
		refine,
		multiColumn,
		show,
		currentRefinement,
		currentBreakpoint,
		boxGrid,
		...rest
	}) => {
		let itemsToShow = show ? items : items.slice(0, show)

		return <OptionsList items={itemsToShow} refine={refine} multiColumn={multiColumn} />
	}
)

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
		const hasRefinements = currentRefinement && currentRefinement.length !== 0
		const hasItems = items && items.length > 0
		const hasMore = hasItems && show && items.length > show

		/* if the show prop is provided limit the number of items displayed
		based on whether the menu is toggled or not */
		let itemsToShow = show && isMenuOpen ? items : items.slice(0, show)

		return (
			<AdaptiveFoldable {...rest} showClear={hasRefinements}>
				{/* Search bar */}
				{searchable && (
					<Box mb="var(--spacing2)">
						<SearchBox
							value={this.state.inputValue}
							onChange={this.onInputChange}
							clear={this.clearInput}
						/>
					</Box>
				)}

				{/* Refinement list */}
				{boxGrid ? (
					<BoxOptionsList items={itemsToShow} refine={refine} />
				) : (
					<OptionsList items={itemsToShow} refine={refine} multiColumn={multiColumn} />
				)}

				{/* More button */}
				{hasMore && (
					<UnstyledButton>
						<Text onClick={this.toggleMenu} size="xs" bold>
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
