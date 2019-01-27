import React from "react"
import { connectRange } from "react-instantsearch-dom"
import { RangeContainer } from "./StyledComponents"

class AlgoliaRange extends React.Component {
	delay = 350

	state = {
		min: this.props.currentRefinement.min,
		max: this.props.currentRefinement.max
	}

	componentDidMount() {
		this.setState(this.props.currentRefinement)
	}

	onChange = (e) => {
		// get the currentTarget from the synthetic event before its inaccessible
		const { name, value } = e.currentTarget

		// update the internal state
		this.setState({ [name]: value })

		// the timeout makes it so the query only gets updated when you stop typing
		clearTimeout(this.rateLimitedRefine)
		this.rateLimitedRefine = setTimeout(() => {
			console.log(this.state, this.props)
			this.props.refine({
				min: Math.max(this.state.min, this.props.min) || this.props.min,
				max: Math.min(this.state.max, this.props.max) || this.props.max
			})
		}, this.delay)
	}

	render() {
		return (
			<RangeContainer>
				<input
					type="number"
					placeholder="Od"
					name="min"
					step={1}
					min={0}
					max={99999}
					onChange={this.onChange}
					value={this.state.min}
				/>
				<input
					type="number"
					placeholder="Do"
					name="max"
					step={1}
					min={0}
					max={99999}
					onChange={this.onChange}
					value={this.state.max}
				/>
			</RangeContainer>
		)
	}
}

export default connectRange(AlgoliaRange)
