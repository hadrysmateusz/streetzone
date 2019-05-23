import React, { useState } from "react"
import SwipeableViews from "react-swipeable-views"
import styled from "styled-components/macro"

import Indicator from "./CarouselIndicator"

const OuterContainer = styled.div`
	position: relative;
	height: 100%;
`

const IndicatorContainer = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	margin-bottom: var(--spacing2);
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	z-index: 10;
`

const ContentContainer = styled.div`
	height: 100%;
	> * {
		height: 100%;
	}
`

const Carousel = ({ onChangeIndex, children, nOfElements }) => {
	const [current, setCurrent] = useState(0)

	const lastIndex = nOfElements - 1

	const _onChangeIndex = (val) => {
		// wrap the index
		if (val < 0) {
			val = lastIndex
		} else {
			val = val % nOfElements
		}

		// trigger external handler
		if (onChangeIndex) {
			onChangeIndex(val)
		}

		// update internal value
		setCurrent(val)
	}

	// const _onPrev = () => {
	// 	_onChangeIndex(current - 1)
	// }

	// const _onNext = () => {
	// 	_onChangeIndex(current + 1)
	// }

	// const hasLeft = current > 0
	// const hasRight = current < lastIndex

	return (
		<OuterContainer>
			<IndicatorContainer>
				<Indicator nOfElements={nOfElements} current={current} onClick={_onChangeIndex} />
			</IndicatorContainer>

			<ContentContainer>
				<SwipeableViews
					index={current}
					onChangeIndex={_onChangeIndex}
					containerStyle={{ height: "100%" }}
				>
					{children(current)}
				</SwipeableViews>
			</ContentContainer>
		</OuterContainer>
	)
}

export default Carousel
