import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { StyledButton } from "./CarouselButton.styles"

export const CarouselButton: React.FC<{
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  scale?: number
  direction: "left" | "right"
}> = ({ onClick, scale = 1, direction }) => (
  <StyledButton onClick={onClick} scale={scale} direction={direction}>
    <FontAwesomeIcon icon={`angle-${direction}`} size="2x" />
  </StyledButton>
)

