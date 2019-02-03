import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { SearchBox } from "./StyledComponents"

class AlgoliaSearchBox extends React.Component {
	delay = 350

	state = { inputValue: this.props.currentRefinement }

	onChange = (e) => {
		// get the currentTarget from the synthetic event before its inaccessible
		const currentTarget = e.currentTarget
		// update the internal state
		this.setState({ inputValue: currentTarget.value })

		// the timeout makes it so the query only gets updated when you stop typing
		clearTimeout(this.rateLimitedRefine)
		this.rateLimitedRefine = setTimeout(() => {
			this.props.refine(currentTarget.value)
		}, this.delay)
	}

	clearField = () => {
		this.setState({ inputValue: "" })

		// the timeout makes it so the query only gets updated when you stop typing
		clearTimeout(this.rateLimitedRefine)
		this.rateLimitedRefine = setTimeout(() => {
			this.props.refine()
		}, this.delay)
	}

	render() {
		return (
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
		)
	}
}

export default connectSearchBox(AlgoliaSearchBox)
