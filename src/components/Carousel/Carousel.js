import React from "react"
import SwipeableViews from "react-swipeable-views"
import styled from "styled-components/macro"
import { autoPlay } from "react-swipeable-views-utils"

import Indicator from "./CarouselIndicator"
import useCarousel from "./useCarousel"

const OuterContainer = styled.div`
	position: relative;
	height: 100%;
`

const ContentContainer = styled.div`
	height: 100%;
	> * {
		height: 100%;
	}
`

const AutoSwipeableViews = autoPlay(SwipeableViews)

const Carousel = ({ handleChange, children, autoPlay, interval }) => {
	const nOfElements = React.Children.count(children)
	const { changeIndex, current } = useCarousel(nOfElements, handleChange)

	const isRenderFn = typeof children === "function"

	const swipeableProps = {
		index: current,
		onChangeIndex: changeIndex,
		containerStyle: { height: "100%" },
		interval,
		children: isRenderFn ? children(current) : children
	}

	return (
		<OuterContainer>
			<Indicator nOfElements={nOfElements} current={current} onClick={changeIndex} />

			<ContentContainer>
				{autoPlay ? (
					<AutoSwipeableViews {...swipeableProps} />
				) : (
					<SwipeableViews {...swipeableProps} />
				)}
			</ContentContainer>
		</OuterContainer>
	)
}

export default Carousel
