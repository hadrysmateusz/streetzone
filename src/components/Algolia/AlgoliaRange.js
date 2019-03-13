import React from "react"
import { connectRange } from "react-instantsearch-dom"
import { RangeContainer } from "./StyledComponents"
import { AdaptiveFoldable } from "../Foldable"

class AlgoliaRange extends React.Component {
	delay = 400

	state = {
		min: this.props.currentRefinement.min || "",
		max: this.props.currentRefinement.max || ""
	}

	resetState = () => {
		this.setState({ min: "", max: "" })
	}

	componentDidUpdate = async (prevProps, prevState) => {
		if (this.props.forceClear.value) {
			this.props.forceClear.update(false)
			this.resetState()
		}
	}

	onChange = (e) => {
		// get the currentTarget from the synthetic event before its inaccessible
		const { name, value } = e.currentTarget

		// update the internal state
		this.setState({ [name]: value })

		// the timeout makes it so the query only gets updated when you stop typing
		clearTimeout(this.rateLimitedRefine)
		this.rateLimitedRefine = setTimeout(() => {
			this.props.refine({
				min: Math.max(this.state.min, this.props.min) || this.props.min,
				max: Math.min(this.state.max, this.props.max) || this.props.max
			})
		}, this.delay)
	}

	render() {
		const { ...rest } = this.props
		return (
			<AdaptiveFoldable
				{...rest}
				showClear={this.state.min || this.state.max}
				resetState={this.resetState}
			>
				<RangeContainer>
					<input
						type="number"
						placeholder={this.props.min}
						name="min"
						step={1}
						min={0}
						max={99999}
						onChange={this.onChange}
						value={this.state.min}
					/>
					<input
						type="number"
						placeholder={this.props.max}
						name="max"
						step={1}
						min={0}
						max={99999}
						onChange={this.onChange}
						value={this.state.max}
					/>
				</RangeContainer>
			</AdaptiveFoldable>
		)
	}
}

export default connectRange(AlgoliaRange)
