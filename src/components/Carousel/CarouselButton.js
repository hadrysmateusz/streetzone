import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { StyledButton } from "./CarouselButton.styles"

const CarouselButton = ({ onClick, scale = 1, direction }) => (
  <StyledButton onClick={onClick} scale={scale} direction={direction}>
    <FontAwesomeIcon icon={`angle-${direction}`} size="2x" />
  </StyledButton>
)

export default CarouselButton
