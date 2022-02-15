import React, { useMemo } from "react"
import SwipeableViews from "react-swipeable-views"
import { autoPlay } from "react-swipeable-views-utils"
import { ContentContainer, OuterContainer } from "./Carousel.styles"

import Indicator from "./CarouselIndicator"
import useCarousel from "./useCarousel"

const AutoSwipeableViews = autoPlay(SwipeableViews)

const Carousel: React.FC<{ interval?: number; autoPlay?: boolean }> = ({
  children,
  autoPlay = false,
  interval,
}) => {
  const nOfElements = React.Children.count(children)
  const { changeIndex, current } = useCarousel(nOfElements)

  const swipeableProps = useMemo(
    () => ({
      index: current,
      onChangeIndex: changeIndex,
      containerStyle: { height: "100%" },
      interval,
      children,
    }),
    [changeIndex, children, current, interval]
  )

  return (
    <OuterContainer>
      <Indicator
        nOfElements={nOfElements}
        current={current}
        onClick={changeIndex}
      />

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
