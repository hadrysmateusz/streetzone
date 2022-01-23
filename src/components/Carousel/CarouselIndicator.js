import { mapN } from "../../utils"

import {
  IndicatorBubble,
  IndicatorContainer,
  IndicatorOuterContainer,
} from "./CarouselIndicator.styles"

const Indicator = ({ current, nOfElements, onClick, primaryColor, secondaryColor, scale }) => {
  const hasMoreThanOne = nOfElements > 1

  return hasMoreThanOne ? (
    <IndicatorOuterContainer>
      <IndicatorContainer>
        {mapN(nOfElements, (i) => {
          const isCurrent = i === current
          return (
            <IndicatorBubble
              key={i}
              isCurrent={isCurrent}
              onClick={() => onClick(i)}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              scale={scale}
            />
          )
        })}
      </IndicatorContainer>
    </IndicatorOuterContainer>
  ) : null
}

export default Indicator
