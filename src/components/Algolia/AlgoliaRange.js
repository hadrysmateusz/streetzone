import React from "react"
import { connectRange } from "react-instantsearch-dom"
import { RangeContainer } from "./StyledComponents"

class AlgoliaRange extends React.Component {
	delay = 400

	state = {
		min: this.props.currentRefinement.min || "",
		max: this.props.currentRefinement.max || ""
	}

	componentDidUpdate = async (prevProps, prevState) => {
		if (this.props.forceClear.value) {
			debugger
			this.props.forceClear.update(false)
			this.setState({ min: "", max: "" })
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

// const AlgoliaRange = ({ refine, min, max, currentRefinement }) => {
// 	return (
// 		<RangeContainer>
// 			<input
// 				type="number"
// 				placeholder="Od"
// 				name="min"
// 				step={1}
// 				min={0}
// 				max={99999}
// 				onChange={(e) => {
// 					refine({
// 						...currentRefinement,
// 						min: Math.max(e.value, min) || min
// 					})
// 				}}
// 				value={currentRefinement.min}
// 			/>
// 			<input
// 				type="number"
// 				placeholder="Do"
// 				name="max"
// 				step={1}
// 				min={0}
// 				max={99999}
// 				onChange={(e) => {
// 					refine({
// 						...currentRefinement,
// 						max: Math.max(e.value, max) || max
// 					})
// 				}}
// 				value={currentRefinement.max}
// 			/>
// 		</RangeContainer>
// 	)
// }

export default connectRange(AlgoliaRange)
