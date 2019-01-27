import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

class AlgoliaRefinementList extends React.Component {
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

	render() {
		return (
			<div>
				<input type="text" onChange={this.onChange} value={this.state.inputValue} />
			</div>
		)
	}
}

export default connectSearchBox(AlgoliaRefinementList)
