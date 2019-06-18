import React from "react"
import SwipeableViews from "react-swipeable-views"
import styled from "styled-components/macro"

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

const Carousel = ({ handleChange, children, nOfElements }) => {
	const { changeIndex, current } = useCarousel(nOfElements, handleChange)

	return (
		<OuterContainer>
			<Indicator nOfElements={nOfElements} current={current} onClick={changeIndex} />

			<ContentContainer>
				<SwipeableViews
					index={current}
					onChangeIndex={changeIndex}
					containerStyle={{ height: "100%" }}
				>
					{children(current)}
				</SwipeableViews>
			</ContentContainer>
		</OuterContainer>
	)
}

export default Carousel
