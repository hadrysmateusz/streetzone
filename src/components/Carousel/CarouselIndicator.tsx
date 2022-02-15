import { mapN } from "../../utils"

import {
  IndicatorBubble,
  IndicatorBubbleProps,
  IndicatorContainer,
  IndicatorOuterContainer,
} from "./CarouselIndicator.styles"

type IndicatorProps = {
  current: number
  nOfElements: number
  onClick: (index: number) => void
} & Omit<IndicatorBubbleProps, "isCurrent">

const Indicator: React.FC<IndicatorProps> = ({
  current,
  nOfElements,
  onClick,
  primaryColor,
  secondaryColor,
  scale,
}) => {
  const hasMoreThanOne = nOfElements > 1

  return hasMoreThanOne ? (
    <IndicatorOuterContainer>
      <IndicatorContainer>
        {mapN(nOfElements, (i) => (
          <IndicatorBubble
            key={i}
            isCurrent={i === current}
            onClick={() => onClick(i)}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            scale={scale}
          />
        ))}
      </IndicatorContainer>
    </IndicatorOuterContainer>
  ) : null
}

export default Indicator
