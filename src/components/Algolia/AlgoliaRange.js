import React, { useState, useEffect, useRef } from "react"
import { connectRange } from "react-instantsearch-dom"

import { AdaptiveFoldable } from "../Foldable"

import { RangeContainer } from "./StyledComponents"

const AlgoliaRange = (props) => {
	const delay = 400

	const [min, setMin] = useState("")
	const [max, setMax] = useState("")

	const timeoutId = useRef()
	const minRef = useRef()
	const maxRef = useRef()

	const reset = () => {
		setMin("")
		setMax("")
	}

	useEffect(() => {
		if (props.clear.value) {
			props.clear.update(false)
			reset()
		}
	}, [props.clear, reset])

	const onChange = () => {
		// get the value from ref
		const _min = minRef.current.value
		const _max = maxRef.current.value

		// update the internal state
		setMin(_min)
		setMax(_max)

		// the timeout makes it so the query only gets updated when you stop typing
		clearTimeout(timeoutId.current)
		timeoutId.current = setTimeout(() => {
			props.refine({
				min: Math.max(_min, props.min) || props.min,
				max: Math.min(_max, props.max) || props.max
			})
		}, delay)
	}

	return (
		<AdaptiveFoldable {...props} showClear={min || max} resetState={reset}>
			<RangeContainer>
				<input
					type="number"
					placeholder={props.min}
					name="min"
					ref={minRef}
					onChange={onChange}
					value={min}
				/>
				<input
					type="number"
					placeholder={props.max}
					name="max"
					ref={maxRef}
					onChange={onChange}
					value={max}
				/>
			</RangeContainer>
		</AdaptiveFoldable>
	)
}

export default connectRange(AlgoliaRange)
