import React from "react"
import { connectRange } from "react-instantsearch-dom"
import { RangeContainer } from "./StyledComponents"
import { ClearRange as Clear } from "./ClearCategoryButton"

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
		const { currentRefinement, attribute, min, max } = this.props
		console.log(this.props)
		return (
			<>
				{(this.state.min || this.state.max) && (
					<Clear attribute={attribute} resetState={this.resetState} />
				)}
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
			</>
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
